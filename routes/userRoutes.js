//import express
const express = require('express');
const { getUserMyActivities, getMyUser } = require('../controllers/userController');
//create router to append routes to
const router = express.Router();
//get handlers from controller
const {gaurd,login} = require('./../controllers/authenicationController');


//declare login route with using login handler from controller
//this is added before the gaurd route so this api doesn't request a token to work
router.post('/users/login', login);

//add gaurd handle to verify token sent in header
router.use(gaurd);

//anything route below this point request a token to function
router.get('/users/me/activities', getUserMyActivities);
router.get('/users/me', getMyUser);

module.exports.userRoutes = router

