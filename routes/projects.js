var express = require('express');
var router = express.Router();

var Projects = require('../models/projects');
var nodemailer = require('nodemailer');


router.get('/', function(req, res, next) {
    res.send('register works fine');
});


router.post('/', function(req, res, next) {

    var updateProjectsModel = new Projects({
        email: req.body.email,
        title: req.body.title,
        story: req.body.story,
        category: req.body.category,
        newEmail: req.body.newEmail,
        status: req.body.status,
        avatar: req.body.avatar
    });

    Projects.addProject(updateProjectsModel, function(err, Projects, callback) {
        if(err) throw err;
        res.json(Projects);
    });

});

router.post('/update', function(req, res, next) {

    var updateProjectsModel = new Projects({
        email: req.body.email,
        newEmail: req.body.newEmail
    });

    Projects.updateProjects(updateProjectsModel, function(err, Projects, callback) {
        if(err) throw err;
        res.json(Projects);
    });

});



router.post('/sendemail', function(req, res, next) {

    var name = req.body.name;
    var sname = req.body.sname;
    var emailFromAdress = req.body.email;
    var textMessage = req.body.message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kuznya911911@gmail.com',
            pass: '123123123QQQ'
        }
    });

    const mailOptions = {
        from: 'sende23123r@email.com', // sender address
        to: req.body.emailTo, // list of receivers
        subject: 'Доброго времени суток!', // Subject line
        html: req.body.message + '<p>С Уважением,</p>' +
        + '' + req.body.name + '' + req.body.sname + '' + req.body.email // plain text body
    };

    console.log(req.body);


    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            res.send(err);
        else
            res.send(info);
    });


});




router.post('/getMyProjects', function(req, res, next) {
    var email = {email: req.body.email};

    Projects.getAllProjects(email, function(err, Projects, callback) {
        if(err) throw err;
        res.json(Projects);
    });

});

router.post('/deleteProject', function(req, res, next) {
    var id = {id: req.body.id};

    Projects.deleteCurrentProject(id, function(err, Projects, callback) {
        if(err) throw err;
        res.json(Projects);
    });

});

router.post('/getProjectsByStatus', function(req, res, next) {
    var status = {status: req.body.status};

    Projects.getProjectByStatus(status, function(err, Projects, callback) {
        if(err) throw err;
        res.json(Projects);
    });

});





module.exports = router;