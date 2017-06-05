var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var port = process.env.PORT || 3001;
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');

app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/public'));

mongoose.connect(config.connDB());

setupController(app);
apiController(app);

app.listen(port);