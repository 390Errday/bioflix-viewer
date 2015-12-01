var express = require('express');
var router = express.Router();

// POST new biometric data.
router.post('/', function(req, res, next) {
  var session = {                 // = req.body?
    movie_name: req.body.movie_name,
    viewer_name: req.body.viewer_name,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    hr_data: req.body.hr_data,
    hr_times: req.body.hr_times,
    gsr_data: req.body.gsr_data,
    gsr_times: req.body.gsr_times
  };

  models.User.create(user).then(function(data) {
    res.send(data);
  }, function(err) {              // session creation failed :(
    res.status(700).send(err);
  });
});

module.exports = router;
