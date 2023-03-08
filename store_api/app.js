require('dotenv').config();
require('express-async-errors');

const notFoundMiddleware = require('../task_manager_api/middleware/not-found');
const errorMiddleware = require('../task_manager_api/middleware/error-handle');
const connectDB = require('./db/connect');
const express = require('express');

const app = express();
const productsRouter = require('./routes/products');
//middleware
app.use(express.json());

//routes

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">PRODUCTS</a>');
})

app.use('/api/v1/products', productsRouter);

//products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () => console.log(`server works on port ${port}`));
  } catch (e) {
      console.log(e)
  }
}

start();