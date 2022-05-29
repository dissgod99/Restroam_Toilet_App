const express = require('express');

const bodyParser = require('body-parser');


const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const jsonParser = bodyParser.json();


const JWT_SECRET = 'qslmnvtuievDVGfzevdsbGDberbDF?dblKN@$^[{^[~#}?LEKMKmv,ruvNXWmntruiskv';


// process variable is not defined when accessed from client (maybe use webpack?)

// if (process.env.MODE === 'DEVELOPMENT') {
//     const CORS = require('cors');
//     router.use(CORS());
// }

const CORS = require('cors');
router.use(CORS());

router.post('/login', jsonParser, async (req, res, next) => {
    let { email, password } = req.body;
    const user = await User.findOne({
        email
    }).lean();

    if (! user) {
        // no user matching the email
        return res.status(401).json({
            message: 'Invalid email/password'
        });
    }

    // the thing with bcrypt is: it uses a different random number with the original each time it is executed. Therefore the compare method
    if (await bcrypt.compare(password, user.password)) {
        // email password combination is correct

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, JWT_SECRET);

        return res.status(200).json({
            JWTtoken: token,
            message: 'Successfully logged in'
        });
    }

    return res.status(401).json({
        message: 'Invalid email/password'
    });
});

router.post('/signup', jsonParser, async (req, res, next) => {
    if (req.body.password.length < 5) return res.status(400).json({
        message: 'Password too short. Minimum length of 5' 
    });
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length > 0) {
                return res.status(409).json({
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
                                email: req.body.email,
                                password: hash,
                            });
                            user
                                .save()
                                .then(result => {
                                    console.log(result);
                                    return res.status(201).json({
                                        message: 'User Created',
                                    });
                                })
                                .catch(err => {
                                    console.log(err);
                                    return res.status(500).json({
                                        message: err,
                                    });
                                });
                        }
                    }
                );
            }
        })
        .catch();

});

router.delete('/:userId', async (req, res, next) => {

})

router.post('/change-password', jsonParser, (req, res, next) => {
    const {token} = req.body;
    const user = jwt.verify(token, JWT_SECRET);
})

module.exports = router;