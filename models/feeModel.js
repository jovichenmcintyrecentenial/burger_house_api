var mongoose = require ('mongoose');
const feeSchema = require('./schemas/feeSchema');

//compiles the schema into a model.
const Fee = mongoose.model('Fee', feeSchema);

module.exports = Fee;
