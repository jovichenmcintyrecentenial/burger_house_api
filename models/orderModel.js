var mongoose = require ('mongoose');
const orderSchema = require('./schemas/orderSchema');

//compiles the schema into a model.
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
