// Pull in dependencies
var express = require('express');
var router = express.Router();

// Import model 
var burger = require('../models/burger.js');

// Add routes 
router.get('/', function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };

    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/burgers', function(req, res) {
  // console.log('req', req.body);
  burger.insertOne([
    'burger_name'
  ], [
    // req.body.burger_name
    req.body.name
  ], function(data) {
    res.redirect('/');
  });
});

router.put('/burgers/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;

  burger.updateOne({
    devoured: true
  }, condition, function(data) {
    res.redirect('/');
  });
});

// Export routes 
module.exports = router;
