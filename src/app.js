const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const {PORT = 3005,
     API_URL = "http://127.0.0.1"
    } = process.env;

app.get('/', (request, response) => {
    response.status(200);
    response.send('Hello, World!');
})

app.post('/', (request, response) => {
    response.status(200);
    response.send('Hello from POST');
})

app.listen(PORT, () => {
    console.log(`Сервер доступен по адресу: ${API_URL}:${PORT}`);
})