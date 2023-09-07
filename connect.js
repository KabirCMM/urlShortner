const mongoose = require('mongoose');

async function connectToMongoDB(url) {
    return mongoose.createConnection(url);
}

module.exports = {
    connectToMongoDB,
}