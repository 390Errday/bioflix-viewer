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

  models.movies.findOne({
    where: {
      movie_name: movie_name
    }
  }).then(function(movie) {
    if(movie === null) {
      handleError(movie_name + ' does not exist in the database! :(', undefined, res);
    } else {
      movie.getSessions().then(function(db_sessions) {
        res.render('movie', {
          movie: movie.get({plain: true}),
          sessions: db_sessions[0].get({plain: true})
        });
      }, function(err) {                          // session search failed
        handleError('Search for ' + movie.movie_name + '\'s sessions failed! :(', err, res);
      });
    }
  }, function(err) {                              // movie search failed
    handleError('Search for the movie failed! :(', err, res);
  });
});

function handleError(message, error, res) {
  res.render('error', {
    message: message,
    error: error
  });
}

module.exports = router;
