const express = require('express');

const bodyParser = require('body-parser');


const router = express.Router();
const mongoose = require('mongoose');


const Toilet = require('../models/toilet');

const jsonParser = bodyParser.json();


const CORS = require('cors');
const toilet = require('../models/toilet');
router.use(CORS());

router.post('/addToilet', jsonParser, async (req, res, next) => {
    Toilet.find({ lattitude: req.body.lattitude, longitude: req.body.longitude })
        .exec()
        .then(toilet => {
            if (toilet.length > 0) {
                // here we should be able to add more toilets? Imagine a restaurant with more than one toilet
                // one for male/female and one with handicap access for example
                return res.status(409).json({
                    message: 'toilet at this location already exists'
                });
            } else {
                const toilet = new toilet({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    owner: req.body.owner,
                    lattitude: req.body.lattitude,
                    longitude: req.body.longitude,
                });
                toilet
                    .save()
                    .then(result => {
                        console.log(result);
                        return res.status(201).json({
                            message: 'toilet added',
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(500).json({
                            message: err,
                        });
                    });
            }
                  
        })
        .catch();

});

router.post('/nearestToilets', jsonParser, async (req, res, next) => {
    User.find({})
        .toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
        });

});




module.exports = router;