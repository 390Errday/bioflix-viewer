var express = require('express');
var router = express.Router();
var models = require("../models");

var movies = [
  { movie_name: 'John Cena' },
  { movie_name: 'John Cena' },
  { movie_name: 'John Cena' },
  { movie_name: 'John Cena' },
  { movie_name: 'John Cena' },
  { movie_name: 'John Cena' },
  { movie_name: 'John Cena' },
  { movie_name: 'John Cena' },
  { movie_name: 'John Cena' }
];

// GET home page.
router.get('/', function(req, res, next) {
  models.sessions.findAll().then(function(sessions) {
    // res.render('index', { movies: sessions });
    res.render('index', { movies: movies });
  });
});

// GET movie page.
router.get('/:movie_name', function(req, res, next) {
  var movie_name = req.params.movie_name

  models.sessions.findAll({
    where: {
      movie_name: movie_name
    }
  }).then(function(sessions) {
    res.render('movie', { sessions: sessions });
  });
});

module.exports = router;
