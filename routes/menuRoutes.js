//import express
const express = require('express');
const {  getMenus,addMenuItem } = require('../controllers/menuController');
//create router to append routes to
const router = express.Router();
//get handlers from controller
const {gaurd,login} = require('./../controllers/authenicationController');


//add gaurd handle to verify token sent in header
router.use(gaurd);

router.get('/menus', getMenus);
router.post('/menus', addMenuItem);


module.exports.menuRoutes = router

