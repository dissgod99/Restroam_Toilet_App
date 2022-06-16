const { checkIfUserIsDeleted } = require('./util');

const express = require('express');

const bodyParser = require('body-parser');


const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Toilet = require('../models/toilet');

const jsonParser = bodyParser.json();

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../contants');

const CORS = require('cors');
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
        .toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
        });

});

router.post('/user-owned-toilets', jsonParser, async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token)
            throw new Error('Missing arugments in request body. Please pass in the token.');
        const decryptedSignature = jwt.verify(token, JWT_SECRET);
        // from this point we know that the request is not malformed. JWT has not been tampered with

        let userId = decryptedSignature.id;
        let user = await User.findById(userId);

        await checkIfUserIsDeleted(user);

        let toilets = await Toilet.find({ owner: user._id });
        if (!toilets)
            toilets = [];
        res.status(200).json({
            message: 'Successfully retrieved toilets for current user.',
            payload: toilets
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

module.exports = router;