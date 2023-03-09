var mongoose = require ('mongoose');

var menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name required'],
    },
    image_url: {
        type: String,
        required: [true, 'image required'],
    },
    type: {
        type: String,
        required: [true, 'type required'],
    },
    calories: {
        type: mongoose.Schema.Types.Number,
        required: [true, 'calories is required'],
    }, 
    likes: {
        type: mongoose.Schema.Types.Number,
        required: [true, 'likes required'],
        default: 0
    },
    prepare_time: {
        type: mongoose.Schema.Types.Number,
        required: [true, 'prepare_time required'],
    },
    price: {
        type: mongoose.Schema.Types.Number,
        required: [true, 'price required'],
    },  
    description: {
        type: String,
        required: [true, 'description required'],
    }, 
    password: {
        type: String,
        minLength: 8,
        select: true,
    }, 
},{timestamps: true});

module.exports = menuSchema;


