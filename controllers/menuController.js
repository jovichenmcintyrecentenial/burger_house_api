//get imports
const jwt = require('jsonwebtoken');
const Menu = require('../models/menuModel.js');
const error = require('./../utils/errors.js')

//get current login in user information
//handler for getting all patient in database
module.exports.getMenus = async (req, res, next) => {

    //search for all patient and return an array
    const {query} = req.query 

    //search for all patient and return an array
    Menu.find(
        {$or:[
            query === undefined?{}:{name: {$regex : query, $options : 'i'},},
            query === undefined?{}:{type: {$regex : query, $options : 'i'},},
        ],
        }).exec(function (error, result) {
        //if error return error
        if (error) return next(new Error(JSON.stringify(error.errors)))
        //return results
        console.log(result)
        res.send(result);
    });

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

