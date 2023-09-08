const User = require('../model/user')
const {v4: uuidV4} = require('uuid')
const {setUser} = require('../services/auth')

async function handleUserSignUp(req, res) {
    const {name, email, password} = req.body;
    await User.create({
        name, email, password,
    });
    return res.redirect('/');

}

async function handleUserLogin(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user) return res.render('login', {
        error: 'Invalid Username or Password',
    });
    const sessionId = uuidV4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId)
    return res.redirect('/');

}

module.exports = {
    handleUserSignUp, handleUserLogin
}