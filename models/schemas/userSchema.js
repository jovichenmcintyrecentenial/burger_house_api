var mongoose = require ('mongoose');
const orderSchema = require('./orderSchema');

var userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'first_name required'],
    },
    last_name: {
        type: String,
        required: [true, 'last_name required'],
    },
    type: {
        type: String,
        required: [true, 'type required'],
    },
    address: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true,
        lowercase: true,
    }, 
    order:{
        type:[orderSchema],
        select: true,
    },
    password: {
        type: String,
        minLength: 8,
        select: true,
    }, 
},{timestamps: true});

module.exports = userSchema;