var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Videourl = new Schema({
    /*fieldname: {
        type: String,
        unique: true
    },*/
    originalname: {
        type: String,
        unique: true
    },
   /* encoding: {
        type: String
    },
    mimetype: {
        type: String
    },
    destination: {
        type: String
    },
    filename: {
        type: String,
        unique: true
    },
    path: {
        type: String,
        unique: true
    },*/
    size: {
        type: String
    }
});


Videourl.plugin(passportLocalMongoose);
module.exports = mongoose.model('Videourl',Videourl);