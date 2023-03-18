

var mongoose = require ('mongoose');

var addressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, 'Formatted Address required'],
    },
    latitude: {
        type: mongoose.Schema.Types.Number,
        required: [true, 'cost required'],
    },  
    longitude: {
        type: mongoose.Schema.Types.Number,
        required: [true, 'cost required'],
    },  
     
},{timestamps: false});

module.exports = addressSchema;


