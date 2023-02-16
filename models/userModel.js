var mongoose = require ('mongoose');
const userSchema = require('./schemas/userSchema');

//compiles the schema into a model.
const User = mongoose.model('User', userSchema);

module.exports = User;
