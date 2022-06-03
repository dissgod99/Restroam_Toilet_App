const mongoose = require('mongoose');

const toiletSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    owner: {type: String, required: true},
    lattitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
});

module.exports = mongoose.model('Toilet', toiletSchema);