//import express
const express = require('express');
const { getUserMyActivities, getMyUser, addUser, addUserAddress, getMyAddresses, deleteUserAddress } = require('../controllers/userController');
//create router to append routes to 
const router = express.Router();
//get handlers from controller 
const {gaurd,login} = require('./../controllers/authenicationController');


//declare login route with using login handler from controller
//this is added before the gaurd route so this api doesn't request a token to work
router.post('/users/login', login);
router.post('/users', addUser);


//add gaurd handle to verify token sent in header
router.use(gaurd);

router.get('/users/me', getMyUser);
router.get('/users/addresses', getMyAddresses);
router.post('/users/addresses', addUserAddress);
router.delete('/users/addresses/:id', deleteUserAddress);


module.exports.userRoutes = router

