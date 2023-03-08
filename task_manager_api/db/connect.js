const mongoose = require('mongoose');

const connectDB = async (url) => {
    return await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
}

module.exports = connectDB;
