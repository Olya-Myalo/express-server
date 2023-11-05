const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('../src/routers/users');
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

// const {PORT = 3005,
//      API_URL = "http://127.0.0.1"
//     } = process.env;

// app.get('/', (request, response) => {
//     response.status(200);
//     response.send('Hello, World!');
// })

// app.post('/', (request, response) => {
//     response.status(200);
//     response.send('Hello from POST');
// })

// app.get('/users/34', (request, response) => {
//     response.status(200);
//     response.send('Users with id:34')
// })

app.use(cors());
app.use(logger);
app.use(bodyParser.json());
app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Сервер доступен по адресу: ${API_URL}:${PORT}`);
})