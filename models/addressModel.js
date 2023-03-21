var mongoose = require ('mongoose');
const addressSchema = require('./schemas/addressSchema');


//compiles the schema into a model.
const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
