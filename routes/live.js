var express = require('express');
var router = express.Router();
var models = require("../models");

// GET new biometric data.
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  res.render('live', { id: id });
});

// POST new biometric data.
router.post('/:id', function(req, res, next) {
  var msg = {
    id: req.params.id,
    type: req.body.type,
    data: req.body.data,
    time: req.body.time
  }
  req.app.io.emit('new data', msg);
  res.send(200);
});

module.exports = router;
