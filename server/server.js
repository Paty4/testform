const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
//const getData = require('./model/data.model');

const app = express();

//app.use(bodyParser.json());
app.use(cors());

//app.use(bodyParser.urlencoded({extended: true}));

app.post('/', (req, res) => {
    console.log(req.query);
    /* getData(req.query)
    .then((response) => {
        //console.log(response);
        res.json(response);
    });
    //console.log(responseData);
    //res.json({massage: "test page", req: req.query}); */
});

app.post('/error', (req, res) => {
    console.log(req.query);
    /* getData(req.query)
    .then((response) => {
        //console.log(response);
        res.json(response);
    });
    //console.log(responseData);
    //res.json({massage: "test page", req: req.query}); */
});

app.listen(3001, () => {
    console.log('server start');
});