var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('register works fine');
});

router.post('/', function(req, res, next) {
    var newUser = new User({
        password: req.body.password,
        email: req.body.email
    });

    User.getUserByEmail(newUser, function(err, user, next) {
        if(err) res.send(err);
        else {
            res.json(user);
        }
    });

});

router.post('/getUserByIds', function(req, res, next) {
    var newUser = new User({
        email: req.body.email
    });

    User.getUserByIds(newUser, function(err, user, next) {
        if(err) res.send(err);
        else {
            res.json(user);
        }
    });
});

router.post('/addRating', function(req, res, next) {
    var newUser = new User({
        email: req.body.email,
        rating: req.body.rating
    });

    User.addRating(newUser, function(err, user, next) {
        if(err) res.send(err);
        else {
            res.json(user);
        }
    });
});


router.post('/sendemail', function(req, res, next) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'proamazons@gmail.com',
            pass: 'proamz123'
        }
    });

    const mailOptions = {
        from: req.body.email, // sender address
        to: 'proamazons@gmail.com', // list of receivers
        subject: 'Subject of your email', // Subject line
        html: req.body.text + req.body.phone// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err);
        else
            console.log(info);
    });

});



module.exports = router;