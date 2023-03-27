var mongoose = require ('mongoose');
const cardSchema = require('./schemas/cardSchema');

//compiles the schema into a model.
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
