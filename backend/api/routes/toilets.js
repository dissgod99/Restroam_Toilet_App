const { checkIfUserIsDeleted ,countAverageRating} = require('./util');

const express = require('express');

const bodyParser = require('body-parser');


const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Toilet = require('../models/toilet');

const jsonParser = bodyParser.json();
const NodeGeocoder = require('node-geocoder');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../contants');

const CORS = require('cors');
router.use(CORS());
const options = {
    provider: 'google',

    // Optional dependin g on the providers
    //fetch: customFetchImplementation,
    apiKey: 'AIzaSyCFbwdnUJoJA5FD6NiAwFevhUnU5jHWycA', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

router.post('/addToilet', jsonParser, async (req, res, next) => {
    try {
        const token = req.body.token;
        console.log(token);
        //if (!token)
        //  throw new Error('Missing arugments in request body. Please pass in the token.');
        const decryptedSignature = jwt.verify(token, JWT_SECRET);
        // from this point we know that the request is not malformed. JWT has not been tampered with

        let userId = decryptedSignature.id;
        let user = await User.findById(userId);

        await checkIfUserIsDeleted(user);

        Toilet.find({ address: req.body.address })
            .exec()
            .then(toilet => {
                if (toilet.length > 0) {
                    // here we should be able to add more toilets? Imagine a restaurant with more than one toilet
                    // one for male/female and one with handicap access for example
                    return res.status(409).json({
                        message: 'toilet at this location already exists'
                    });
                } else {
                    const toilet = new Toilet({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        address: req.body.address,
                        owner: user,
                        openingHours: req.body.openingHours,
                        price: req.body.price,
                        handicapAccess: req.body.handicapAccess,
                        details: req.body.details

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
    } catch (e) {
        res.status(400).json({ message: e.message });
    }

});


// also need to pass in the token and check if it matches that of user that created toilet for security layer?
router.post('/deleteToilet', jsonParser, async (req, res, next) => {
    Toilet.find({ name: req.body.name })
        .exec()
        .then(async (toilet) => {
            if (toilet.length > 0) {
                console.log(toilet);
                await Toilet.deleteOne({ "name": req.body.name });
                return res.status(200).json({
                    message: 'Toilet deleted successfully',
                });
            } else {
                return res.status(500).json({
                    message: "Toilet at this location doesn't exists"
                });
            }

        })
        .catch(err => console.log("error occured while deleting the toilet!"));

});

router.post('/edit-toilet', jsonParser, async (req, res, next) => {
    let { name, newName, newAddress, newPrice, newDetails, newHandicapAccess } = req.body;
    
    let updateObj = {
        name: newName,
        address: newAddress,
        price: newPrice,
        details: newDetails,
        handicapAccess: newHandicapAccess,
    };

    let updatedToilet;
    try {
        updatedToilet = await Toilet.findOneAndUpdate({ name }, updateObj, { new: true })
        return res.status(200).json({
            message: 'Toilet updated successfully to: ' + JSON.stringify(updatedToilet),
        });
    }
    catch (err) {
        console.log("error occured while editing the toilet: " + err);
        return res.status(400).json({
            message: err,
        });
    };

});

function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist
}

router.post('/nearestToilets', jsonParser, async (req, res, next) => {
    Toilet.find({})
    .exec()
    .then(async (toilet) => {
        let toilets = [];
        for(let i=0;i< toilet.length; i++) {
            entry=toilet[i];
            console.log(entry);
            const result = await geocoder.geocode(entry.address);
            
            var dist = distance(result[0].latitude, result[0].longitude, req.body.latitude, req.body.longitude, 'K');
            console.log(dist);
            if(dist<2){
                //console.log(dist);
                //console.log(entry);
               // toilets.push(toilet_info);
               const rate = await countAverageRating(entry);
               
               toilets.push( {toilet_details:entry,distance:dist, averageRating:rate, latitude:result[0].latitude,longitude:result[0].longitude }); 

            }
                
        }
    console.log(toilets);
    return res.status(200).json({
        message: 'Successfully retrieved toilets for current user.',
        payload: toilets
    });
})
.catch(err => {return res.status(500).send("error occured!")});
    
});

function sortByPrice(arr) {
    return arr.sort(function (a, b) { return a.price - b.price })
}

function sortByDistance(arr) {
    return arr.sort(function (a, b) { return a.distance - b.distance })
}

function showOnlyHandicapAccess(arr) {
    return arr.filter(
        (toilet) => {
            return toilet.handicapAccess;
        }
    )
}

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


        // problem here is if we filter by owner the object can be changed because it includes the user's hashed password which can be changed anytime the user 
        let toiletsTmp = await Toilet.find();

        let toilets = []

        toiletsTmp.forEach(toit => {
            if (toit.owner._id == userId) toilets.push(toit);
        });

        res.status(200).json({
            message: 'Successfully retrieved toilets for current user.',
            payload: toilets
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

module.exports = router;