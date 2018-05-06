const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4300;


const cacheRoute = require('./server/routes/cacheRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use('/client', express.static('/'));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});

app.use('/cache', cacheRoute);
app.get("/", function (req, res) {
    res.redirect("cache");
});


const errorHandler = function (err, req, res, next) {
    console.error('Error:', err);
    res.status(500).send({ message: "server error" });
};

app.use(errorHandler);
app.listen(port);

console.log('API started on: ' + port);