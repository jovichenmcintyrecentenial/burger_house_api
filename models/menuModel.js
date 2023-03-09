var mongoose = require ('mongoose');
const menuSchema = require('./schemas/menuSchema');

//compiles the schema into a model.
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
