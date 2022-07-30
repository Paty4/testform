const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());


app.post('/data', (req, res) => {
    res.status(200);
    res.send({status: 'success', message: 'Данные получены сервером'});
    console.log('send ok');
});

app.post('/error', (req, res) => {
    res.status(404);
    res.send({status: 'error', message: 'Данные отвергнуты сервером'});
    console.log('send error');
});

app.listen(3001, () => {
    console.log('server start');
});