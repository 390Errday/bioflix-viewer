var express = require('express');
var router = express.Router();
var models = require("../models");

// POST new biometric data.
router.get('/', function(req, res, next) {
  res.render('live');
});

module.exports = router;
