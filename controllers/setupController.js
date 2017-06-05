var Authors = require('../models/authorModel');
var Books = require('../models/bookModel');

module.exports = (app) => {

	app.get('/setup/authors', (req, res) => {
		var initAuthors = {
			author: ["Jason", "Percy", "Osiki"]
		}

		Authors.create(initAuthors, (err, results) => {
			res.send(results);
		});
	});

	app.get('/setup/books', (req, res) => {
		var initBooks = [
			{
				name: 'Condor Heros',
				year: 1567,
				author: {name: "Jason", age: 93}
			},
			{
				name: 'Flying Fox',
				year: 1798,
				author: {name: "Jason", age: 93}
			},
			{
				name: 'Flying Mates',
				year: 1997,
				author: {name: "Percy", age: 52}
			},
			{
				name: 'Ninja Game',
				year: 2010,
				author: {name: "Osiki", age: 38}
			}
		];

		Books.create(initBooks, (err, results) => {
			res.send(results);
		});
	});
}