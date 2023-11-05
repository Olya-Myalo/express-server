const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('../src/routers/users');
const bookRouter = require("../src/routers/books");
const logger = require('./middlewares/logger');

dotenv.config();

const {
    PORT = 3005,
    API_URL = "http://127.0.0.1",
    MONGO_URL = "mongodb://127.0.0.1:27017/test",
  } = process.env;
  
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

const app = express();

app.use(cors());
app.use(logger);
app.use(bodyParser.json());
app.use(userRouter);
app.use(bookRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
  });
  
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
  });

app.listen(PORT, () => {
    console.log(`Сервер доступен по адресу: ${API_URL}:${PORT}`);
})