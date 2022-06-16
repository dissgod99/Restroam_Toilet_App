const express = require('express');

const bodyParser = require('body-parser');


const router = express.Router();
const mongoose = require('mongoose');


const Toilet = require('../models/toilet');

const jsonParser = bodyParser.json();
const NodeGeocoder = require('node-geocoder');


const CORS = require('cors');
router.use(CORS());
const options = {
    provider: 'google',
  
    // Optional depending on the providers
    fetch: customFetchImplementation,
    apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
  };
  
const geocoder = NodeGeocoder(options);

router.post('/addToilet', jsonParser, async (req, res, next) => {
    Toilet.find({ lattitude: req.body.lattitude, longitude: req.body.longitude })
        .exec()
        .then(toilet => {
            if (toilet.length > 0) {
                return res.status(409).json({
                    message: 'toilet at this location already exists'
                });
            } else {
                const toilet = new toilet({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    address: req.body.address,
                    owner: req.body.owner,
                    openingHours: req.body.openingHours,
                    price: req.body.price,
                    handicapAccess: req.body.handicapAccess,

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

router.delete('/deleteToilet', jsonParser, async (req, res, next) => {
    Toilet.find({ name: req.body.name })
        .exec()
        .then(toilet => {
            if (toilet.length > 0) {
                Toilet.deleteOne( { name: req.body.name  } );
                return res.status(200).json({
                    message: 'toilet deleted successfully',
                });
            } else {
                return res.status(409).json({
                    message: "toilet at this location doesn't exists"
                });
            }
                  
        })
        .catch(err => console.log("error occured while deleting the toilet!"));

});

router.post('/editToilet', jsonParser, async (req, res, next) => {
    Toilet.find({ name: req.body.name })
        .exec()
        .then(toilet => {
            if (toilet.length > 0) {
                Toilet.update(
                    {"name" : req.body.name},
                    {$set: req.body.update});// should be a json object like { "EmployeeName" : "NewMartin"}
                    return res.status(200).json({
                        message: 'toilet updated successfully',
                    });
            } else {
                return res.status(409).json({
                    message: "toilet at this location doesn't exists"
                });
            }
                  
        })
        .catch(err => console.log("error occured while editing the toilet!"));

});
function filterfct (pilot) {
    return pilot.faction === "Rebels";
  }


router.get('/nearestToilets', jsonParser, async (req, res, next) => {
    Toilet.find({})
        .toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
        })
        .map(toilet => {
            const result = await geocoder.geocode(toilet.address);
            var distance = distance(result[0].latitude, result[0].longitude, req.body.latitude, req.body.longitude, 'K');
            toilet.distance=distance;
        })
        .filter(
            (toilet) => {
                return toilet.distance>2;
              } 
        );
   return res.status(200).send(result)
});

function sortByPrice(arr){
    return arr.sort(function(a, b){return a.price - b.price})
}

function sortByDistance(arr){
    return arr.sort(function(a, b){return a.distance - b.distance})
}

function showOnlyHandicapAccess(arr){
    return arr.filter(
        (toilet) => {
            return toilet.handicapAccess;
          } 
    )
}


module.exports = router;