var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookSchema = new Schema({
	name: String,
	year: Number,
	date: { type: Date, default: Date.now },
	author: {name: String, age: Number},
	img: String,
});

var Books = mongoose.model('Books', bookSchema);

module.exports = Books;