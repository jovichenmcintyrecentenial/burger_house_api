var mongoose = require ('mongoose');

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
    password: {
        type: String,
        minLength: 8,
        select: true,
    }, 
},{timestamps: true});

module.exports = userSchema;