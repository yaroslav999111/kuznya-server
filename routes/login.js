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


    var name = req.body.name;
    var email = req.body.email;
    var text = req.body.message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kuznya911911@gmail.com',
            pass: '123123123QQQ'
        }
    });

    const mailOptions = {
        from: email, // sender address
        to: 'proamazons@gmail.com', // list of receivers
        subject: 'Доброго времени суток!', // Subject line
        html: text
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            res.send(err);
        else
            res.send(info);
    });








});



module.exports = router;