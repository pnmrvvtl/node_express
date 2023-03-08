const express = require('express');
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require("./middleware/not-found");
const errorHandleMiddleware = require('./middleware/error-handle');
require('dotenv').config();

const app = express();

//middleware
app.use(express.static('./public'));
app.use(express.json());

//routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandleMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`server is working on port ${port}`));
    } catch (e) {
        console.log(e);
    }
}

start();


