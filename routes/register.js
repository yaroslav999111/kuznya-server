var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('register works fine');
});

router.post('/', function(req, res, next) {
        var username = req.body.username;
        var sname = req.body.sname;
        var mobile = req.body.mobile;
        var password = req.body.password;
        var email = req.body.email;

        var newUser = new User({
            username: username,
            sname: sname,
            mobile: mobile,
            password: password,
            email: email
        });

        User.createUser(newUser, function(err, callback) {
            if(err) throw err;
            res.json(callback);
        });

        // req.flash('success_msg', 'You are register and now login');
    // }
});

router.post('/update', function(req, res, next) {

    var updateUserModel = new User({
        username: req.body.username,
        sname: req.body.sname,
        mobile: req.body.mobile,
        password: req.body.password,
        email: req.body.email,
        site: req.body.site,
        position: req.body.position,
        about: req.body.about,
        freeOrBusy: req.body.freeOrBusy,
        photoAva: req.body.photoA,
        newEmail: req.body.newEmail,
        avatar: req.body.avatar
    });
    User.updateUser( updateUserModel, function(err, user, callback) {
        if(err) throw err;
        res.json(user);
    });



});


module.exports = router;