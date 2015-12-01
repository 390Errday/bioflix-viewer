var express = require('express');
var router = express.Router();

var movies = [
  'John Cena',
  'Ryan Stanley',
  'John Cena',
  'Ryan Stanley',
  'John Cena',
  'Ryan Stanley',
  'John Cena',
  'Ryan Stanley'
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { movies: movies });
});

module.exports = router;
