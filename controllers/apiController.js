var Authors = require('../models/authorModel');
var Books = require('../models/bookModel');
var bodyParser = require('body-parser');

module.exports = (app) => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.get('/', (req, res) => {
		res.redirect('/api/book');
	});

	app.get('/404', (req, res) => {
		res.status(404).send("404 means...");
	});

	app.get('/api/author/create', (req, res) => {
		res.render('create/author');
	});

	app.post('/api/author/create', (req, res) => {
		var currentAuthor;
		Authors.find({}, (err, authors) => {
			if(err) throw err;
			currentAuthor = authors[0].author;

			// check if name inside author array
			if(currentAuthor.indexOf(req.body.name) > -1){
				res.send("Author Exists!");
				return;
			}

			if(req.body.name.trim() === "" || req.body.name.trim() === null){
				res.send("No Way!");
				return;
			}

			// push new value to array and update to existing database
			currentAuthor.push(req.body.name);

			Authors.update({}, {
				author: currentAuthor		
			}, (req2, res2) => {
				res.redirect('/api/author/all');
			});
		});
	});

	app.get('/api/book/create', (req, res) => {
		Authors.find({}, (err, authors) => {
			if(err) throw err;
			res.render('create/book', {AuthorList: authors[0].author, Year: (new Date()).getFullYear() });
		});
	});

	app.post('/api/book/create', (req, res) => {

		var imgPath = null;

		if(req.files){
			let cover = req.files.img;
			imgPath = Math.random().toString(36).substring(15)+cover.name;
			cover.mv('public/uploads/'+imgPath, (err) => {

			});	
		}

		var newBook = Books({
			name: req.body.name,
			year: req.body.year,
			'author.name': req.body.author,
			'author.age': req.body.age,
			img: imgPath		
		});

		newBook.save((error) => {
			if(error) throw error;
			res.redirect('/api/book');
		});
	});

	app.get('/api/book', (req, res) => {
		Books.find({}, (err, books) => {
			if(err) throw err;
			res.render('bookList', {Book: books});
		});
	});

	app.get('/api/book/:name', (req, res) => {
		Books.find({'name': req.params.name}, (err, books) => {
			if(err) throw err;
			if(books[0]){
				books[0].img = books[0].img === undefined ? "noimg.png" : books[0].img;
			}
			res.render('bookDetails', { Book: books });
		});
	});

	app.get('/api/author/all', (req, res) => {
		Authors.find({}, (err, authors) => {
			if(err) throw err;
			res.render('authorList', {AuthorList: authors});
		});
	});

	app.get('/api/author/:name', (req, res) => {
		Books.find({'author.name': req.params.name}, (err, books) => {
			if(err) throw err;
			res.render('bookList', {Book: books});
		});
	});

	app.delete('/api/author/:name', (req, res) => {
		var currentAuthor;
		Authors.find({}, (err, authors) => {
			if(err) throw err;
			currentAuthor = authors[0].author;

			// push new value to array and update to existing database

			currentAuthor.splice(currentAuthor.indexOf(req.body.name), 1);

			Authors.update({}, {
				author: currentAuthor		
			}, (req2, res2) => {
				//res.redirect('/api/author/all');
			});
		});		
	});
}