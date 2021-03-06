var express = require('express');
var router = express.Router();
var models = require("../models");

// GET home page.
router.get('/', function(req, res, next) {
  models.movies.findAll().then(function(movies) {
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
          sessions: (db_sessions.length > 0) ? db_sessions[0].get({plain: true}) : undefined
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
