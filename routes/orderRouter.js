//import express
const express = require('express');
const {  getOrders,addOrder } = require('../controllers/orderController');
//create router to append routes to
const router = express.Router();
//get handlers from controller
const {gaurd,login} = require('./../controllers/authenicationController');


//add gaurd handle to verify token sent in header
router.use(gaurd);

router.get('/orders', getOrders);
router.post('/orders', addOrder);


module.exports.orderRoutes = router

