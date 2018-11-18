var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', function(req, res, next) {
    User.getAllUsers( function(err, Projects, callback) {
        if(err) throw err;
        res.json(Projects);
    });
});



module.exports = router;
