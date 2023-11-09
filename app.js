const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const downloadRouter = require('./routes/Download');
const adduserRouter = require('./routes/Adduser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/home.html");
})
app.get('/signin', function (req, res) {
	res.sendFile(__dirname + "/public/signIn.html");
})
app.get('/register', function (req, res) {
	res.sendFile(__dirname + "/public/Register.html");
})
app.use('/download', downloadRouter);
app.use('/adduser', adduserRouter);

app.use((req, res, next) => {
	next(createError(404));
});
app.use((err, req, res) => {
	res.status(err.status || 500).json({message: err.message});
});

module.exports = app;
