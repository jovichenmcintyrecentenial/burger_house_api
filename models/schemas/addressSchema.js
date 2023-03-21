

var mongoose = require ('mongoose');

var addressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, 'Formatted Address required'],
    },
    latitude: {
        type: mongoose.Schema.Types.Number,
        required: [true, 'lat required'],
    },  
    longitude: {
        type: mongoose.Schema.Types.Number,
        required: [true, 'long required'],
    },  
     
},{timestamps: true});

module.exports = addressSchema;


