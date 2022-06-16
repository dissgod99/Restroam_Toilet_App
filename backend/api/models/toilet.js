const mongoose = require('mongoose');

const toiletSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    owner: {type: String, required: true},
    openingHours: {type: String, required: true},
    price: {type: String, required: true},
    handicapAccess: {type: String, required: true},

});

module.exports = mongoose.model('Toilet', toiletSchema);