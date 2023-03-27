const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    card_number: {
        type: String,
        required: true
    },
    card_date: {
        type: String,
        required: true
    },
    cvv: {
        type: Number,
        required: true
    }
}, { timestamps: true });


module.exports = cardSchema;