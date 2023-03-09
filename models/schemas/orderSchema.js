var mongoose = require ('mongoose');
const menuSchema = require('../schemas/menuSchema.js');
const feeSchema = require('./feeSchema.js');
const userSchema = require('./userSchema.js');

var orderSchema = new mongoose.Schema({
    menu_items: {
        type: [menuSchema],
        required: [true, 'menu items required'],
    },
    fees: {
        type: [feeSchema],
    },
    deliver: {
        type: String,
    },
    customer_id: {
        type: String,
    },
    total:{
        type: Number,
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    is_delivered: {
        type: Boolean,
        default: false
    },
    
},{timestamps: true});

module.exports = orderSchema;

