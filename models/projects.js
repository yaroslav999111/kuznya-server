const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectsSchema = new Schema({
    email: {
        type: String
    },
    title: {
        type: String
    },
    story: {
        type: String
    },
    category: {
        type: String
    },
    newEmail: {
        type: String
    },
    status: {
        type: String
    },
    avatar: {
        type: String
    }

} , {collection: 'projects'});

var Projects = module.exports = mongoose.model("Projects", projectsSchema);

module.exports.addProject = function(projects, callback) {

    var updateUserNewCheckedData = {};

    function checkForLength() {

        if (projects.newEmail) {
            updateUserNewCheckedData.email = projects.newEmail
        }
        if (projects.title) {
            updateUserNewCheckedData.title = projects.title
        }
        if (projects.story) {
            updateUserNewCheckedData.story = projects.story
        }
        if (projects.category) {
            updateUserNewCheckedData.category = projects.category
        }
        if (projects.status) {
            updateUserNewCheckedData.status = projects.status
        }
        if (projects.avatar) {
            updateUserNewCheckedData.avatar = projects.avatar
        }

        projects.save(callback);

    }

    checkForLength();

};


module.exports.updateProjects = function(projects, callback) {

    var updateUserNewCheckedData = {};

    function checkForLength() {

        if (projects.newEmail) {
            updateUserNewCheckedData.email = projects.newEmail
        }

    }

    checkForLength();


    Projects.update({"email": projects.email},{
        $set: updateUserNewCheckedData
    }, {multi:true, upsert:true}, function(err, Projects) {
        if(err) {
            return callback(err);
        } else {
            return callback(null, Projects)
        }
    })

};


module.exports.getAllProjects = function(email, callback) {
    Projects.find({"email": email.email.email}, function(err, Projects) {
        if(err) {
            return callback(err);
        } else {
            return callback(null, Projects)
        }
    })
};

module.exports.getProjectByStatus = function(status, callback) {
    console.log(status.status)
    Projects.find({"status": status.status}, function(err, Projects) {
        if(err) {
            return callback(err);
        } else {
            return callback(null, Projects)
        }
    })
};


module.exports.deleteCurrentProject = function(id, callback) {
    console.log(id);
    Projects.findOneAndDelete({"_id": id.id},function(err, Projects) {
        if(err) {
            return callback(err);
        } else {
            return callback(null, Projects)
        }
    })

};
