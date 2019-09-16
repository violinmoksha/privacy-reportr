var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')

var guid = require('./routes/guid');
var report = require('./routes/report');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors())

app.use('/api/v1/make_guid', guid);
app.use('/api/v1/make_report', report);

module.exports = app;
