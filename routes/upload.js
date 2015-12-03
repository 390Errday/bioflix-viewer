var express = require('express');
var router = express.Router();
var models = require("../models");

function mergeToStringifiedArray(string_array1, string_array2, callback) {
  if(string_array1 && string_array2) {
    var array1 = string_array1.split(',');
    var array2 = string_array2.split(',');

    if(string_array1.length === string_array2.length) {
      var merged_array = [];
      for(var i=0; i<array1.length; i++) {
        var pair = [Number(array1[i]), Number(array2[i])];
        merged_array.push(pair);
      }
      callback(JSON.stringify(merged_array));
    } else {
        callback(undefined, 'Pair does not have the same length. length1: ' + string_array1.length + ' length2: ' + string_array2.length);
    }
  } else {
    callback(undefined, 'Missing one or more values array.');
  }
}

// POST new biometric data.
router.post('/', function(req, res, next) {
  var movie = {
    movie_name: req.body.movie_name,
    poster_url: req.body.poster_url
  };

  var hr_data = req.body.hr_data;
  var hr_times = req.body.hr_times;
  var gsr_data = req.body.gsr_data;
  var gsr_times = req.body.gsr_times;

  mergeToStringifiedArray(hr_data, hr_times, function(hr, err) {
    if(err) {
      res.send('Error parsing heart rate data. ' + err);
    } else {
      mergeToStringifiedArray(gsr_data, gsr_times, function(gsr, err) {
        if(err) {
          res.send('Error parsing galvanic skin response data. ' + err);
        } else {
          var session = {
            viewer_name: req.body.viewer_name,
            start_time: Number(req.body.start_time),
            end_time: Number(req.body.end_time),
            hr: hr,
            gsr: gsr
          };

          console.log('movie:', movie);
          console.log('session:', session);
          handleAddToDatabase(movie, session, function(result, err){
            if(err) {
              res.send(err);
            } else {
              res.send(result);
            }
          });
        }
      });
    }
  });
});

function handleAddToDatabase(movie, session, callback){
  // first look for the movie in the database
  models.movies.findOne({
    where: {
      movie_name: movie.movie_name
    }
  }).then(function(db_movie) {
    // then create new movie if it doesn't exist already
    if(db_movie === null) {
      console.log('creating new movie!');
      models.movies.create(movie).then(function(new_db_movie) {
        console.log('added new movie!', new_db_movie);
        createSession(new_db_movie, session, callback);
      }, function(err) {                          // movie creation failed
        callback(undefined, err);
      });
    } else {
      createSession(db_movie, session, callback);
    }
  }, function(err) {                              // movie search failed
    callback(undefined, err);
  });
}

function createSession(db_movie, session, callback) {
  console.log('creating new session!');
  models.sessions.create(session).then(function(db_session) {
    console.log('added new session!', db_session);
    console.log('adding session to movie!');
    db_movie.addSession(db_session).then(function(result) {
      console.log('added session to movie!', result);
      callback(result);
    }, function(err) {                            // add session to movie failed
      callback(undefined, err);
    });
  }, function(err) {                              // session creation failed
    callback(undefined, err);
  });
}

module.exports = router;
