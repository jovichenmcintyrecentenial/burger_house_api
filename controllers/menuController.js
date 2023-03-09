//get imports
const jwt = require('jsonwebtoken');
const Menu = require('../models/menuModel.js');
const error = require('./../utils/errors.js')

//get current login in user information
module.exports.getMenus = async (req, res, next) => {
    
    //find user recent activty in database based on user id
    Menu.findOne({ _id: req.userId }).exec(function (error, user) {
        
        //if error return the error response
        if (error) return next(new Error(JSON.stringify(error.errors)))

        //if patient found bring user object
        if (user) {
            console.log(user)
            res.send(user)
        } else 
        //if unable to find user return 404
        {
            console.log('Not Founded')
            res.send(404)
        }
    })
}



//handler for creating new user activity
module.exports.addMenuItem = async (req, res, next)  => {

    //extract arguements from request body
    const{name, type,calories,price, prepare_time,likes,description,image_url} = req.body;

    // Creating new menu item.
    var newMenu = new Menu({
        name: name,
        type: type,
        calories: calories,
        price: price,
        image_url: image_url,
        prepare_time: prepare_time,
        likes:likes,
        description:description
    });

    // Create the patient and saving to db
    newMenu.save(function (err, result) {

        //if error return error
        if (err) return error.Error(req,res,next,JSON.stringify(err))
        console.log(result)

        //return newly created menu if added successfully
        return res.status(201).send(result)


    })

    return true;
}

