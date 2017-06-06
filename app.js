const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const config = require('./config');
const port = process.env.PORT || 3001;
const setupController = require('./controllers/setupController');
const apiController = require('./controllers/apiController');

app.set('view engine', 'ejs');
app.use('/assets', express.static(__dirname + '/public'));
app.use(fileUpload({
	limits: { fileSize: 50 * 1024 * 1024 },
}));

mongoose.connect(config.connDB());

setupController(app);
apiController(app);

app.listen(port);