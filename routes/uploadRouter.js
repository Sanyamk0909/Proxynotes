const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/videos');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const videoFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(mp4|MP4)$/)) {
        return cb(new Error('You can upload only video files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: videoFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 200;
    res.end('GET operation not supported on /api/media/upload');
})
.post(authenticate.verifyUser, upload.single('videoFile'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
})
/*.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /videoUpload');
})
.delete((req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /videoUpload');
});*/

module.exports = uploadRouter;