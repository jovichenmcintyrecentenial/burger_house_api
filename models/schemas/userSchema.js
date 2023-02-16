var mongoose = require ('mongoose');
const activitySchema = require('../activityModel');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name required'],
    },
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true,
        lowercase: true,
    }, 
    job_title: {
        type: String,
    }, 
    activities: {
        type:[activitySchema],
        select:false
    },
    password: {
        type: String,
        minLength: 8,
        select: false,
    }, 
},{timestamps: true});

module.exports = userSchema;