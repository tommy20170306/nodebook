var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var authorSchema = new Schema({
	author: [String]
});

var Authors = mongoose.model('Authors', authorSchema);

module.exports = Authors;