var mongoose = require ('mongoose');

var feeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name required'],
    },
    price: {
        type: mongoose.Schema.Types.Number,
        required: [true, 'cost required'],
    },  
     
},{timestamps: false});

module.exports = feeSchema;


