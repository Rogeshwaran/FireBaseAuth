const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');

// const initRouter = require('./routes/Init')
const downloadRouter = require('./routes/Download');
const adduserRouter = require('./routes/Adduser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
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
