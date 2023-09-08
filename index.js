const express = require ('express')
const {connectToMongoDB} = require('./connect')
const path = require('path')
const cookieParser = require('cookie-parser')

const URL = require('./model/url')

const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')
const { restrictToLoggedinUser, checkAuth } = require('./middleware/auth')

const app = express()
const PORT = process.env.PORT || 3000

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(() =>
console.log("Mongodb connected")
);

app.set('view engine', 'ejs')
app.set('views', path.resolve('./view'))

app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())

app.get('/test', async(req,res) => {
    const allUrls = await URL.find({});
    return res.render('home',{
        urls: allUrls,
    });
})

app.use('/url',restrictToLoggedinUser, urlRoute)
app.use('/',checkAuth, staticRoute)
app.use('/user', userRoute)



app.get('/url/:shortId', async (req,res) =>{
    const shortID = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortID
    },{
        $push: {
            visitHistory: {
                timestamp: Date.now(),
        }
    }
    });
    res.redirect(entry.redirectURL)

})

app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`)
}
)