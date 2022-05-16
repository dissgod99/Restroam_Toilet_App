const express = require('express');

const bodyParser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const jsonParser = bodyParser.json();

router.post('/signup', jsonParser, (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length > 0) {
                res.status(409).json({
                    message: 'User with this E-Mail address already exists'
                });
            } else {
                bcrypt.hash(
                    req.body.password,
                    10,
                    (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err,
                            });
                        } else {
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                username: req.body.username,
                                email: req.body.email,
                                password: hash,
                            });
                            user
                                .save()
                                .then(result => {
                                    console.log(result);
                                    res.status(201).json({
                                        message: 'User Created',
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({
                                        error: err,
                                    });
                                });
                        }
                    }
                );
            }
        })
        .catch();

});

router.delete('/:userId', (req, res, next) => {

})

module.exports = router;