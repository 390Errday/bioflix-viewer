var express = require('express');
var router = express.Router();
var models = require("../models");


// GET all sessions
router.get('/getallsessions', function(req, res, next) {
  models.sessions.findAll()
    .then(function(sessions) {
      res.json(sessions);
    }, function(err) {                              // movie search failed
      handleError('Error getting all movies! :(', err, res);
    });
});

router.post('/deletesession', function(req, res, next) {
  var startTime = req.body.startTime;
  var viewerName = req.body.viewerName;
  if(!viewerName) handleError("viewerName not provided", true, res);
  else if(!startTime) handleError('startTime not provided', true, res);
  else {
    console.log("IN ELSE");
    models.sessions.destroy({
      where : {
        start_time : startTime,
        viewer_name : viewerName
      }
    })
    .then(function(numOfRowsDeleted) {
      var jsonResponse = {};
        jsonResponse.rowsDeleted = numOfRowsDeleted;
      res.json(jsonResponse);
    }, function(err) {                         // movie search failed
      handleError('Error deleting a movie! :(', err, res);
    });
  }
});

function handleError(message, error, res) {
  var jsonResponse = {};
  jsonResponse.message = message;
  jsonResponse.error = error;
  res.json(jsonResponse);
}

module.exports = router;
