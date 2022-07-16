const express = require('express');
const router = express.Router();
const multer = require('multer');
const Image = require('../models/image');

const fs = require('fs');
const path = require('path');


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let withoutExtension = file.originalname.split('.');
        let fileExt = withoutExtension.pop();
        withoutExtension = withoutExtension.join('.');
        cb(null, withoutExtension + '-' + Date.now() + '.' + fileExt);
    }
});

let upload = multer({
    storage: storage
});


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


const uploadSinglePhoto = upload.array("photos", 5);

// Upload image
router.post('/upload-file', function (req, res, next) {

    uploadSinglePhoto(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            console.log('Multer Error');
        } else {
            let { toiletId, photoType } = req.body;

            console.log(req.body);
            if (!toiletId || !photoType) {
                return res.status(400).json({
                    message: 'Please make sure to pass in the body as form data both toiletId and photoType properties.'
                });
            }

            console.log(req.files);
            let _fs = req.files;
            if (_fs == undefined || _fs == null) {
                return res.status(400).json({
                    message: 'Please make sure to pass in a file as part of form data.'
                });
            }

            let dbImages = []
            _fs.forEach(_f => {
                let newImage = {
                    path: _f.path,
                    img: {
                        data: fs.readFileSync(path.join('uploads/' + _f.filename)),
                        contentType: photoType,
                    },
                    originalname: _f.filename,
                    toilet_id: toiletId,
                };
                dbImages.push(newImage); 
            });

            Image.insertMany(dbImages, function (err) {
                    
                if (err) {
                    console.log('err: ' + err);
                    return res.status(400).json({
                        message: err
                    });
                }
                else {
                    return res.status(200).json({
                        message: 'Files successfully saved to the database.'
                    });
                }
            });
        }
    })

});

// To get all the images/files stored in MongoDB
router.get('/get-images', function (req, res) {

    Image.getImages(function (err, images) {
        if (err) {
            console.log(err);
            res.status(400).json({
                message: err
            });
        }
        else {
            res.render('imagesPage', { items: images });
        }

    });
});

router.get('/:id', function (req, res) {

    Image.getImageById(req.params.id, function (err, image) {
        if (err) {
            console.log(err);
            res.status(400).json({
                message: err
            });
        }
        //res.download(genres.path);
        res.status(200).json({
            base64Data: image.img.data.toString('base64'),
            contentType: image.img.contentType
        });
    });
});

module.exports = router;