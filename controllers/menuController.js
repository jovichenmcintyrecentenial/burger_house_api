//get imports
const jwt = require('jsonwebtoken');
const Menu = require('../models/menuModel.js');
const error = require('./../utils/errors.js')

//get current login in user information
//handler for getting all patient in database
module.exports.getMenus = async (req, res, next) => {
    const { query,popular,types,category } = req.query;

    // Define the search query using $or operator
    var searchQuery = {
        $or: [
            query === undefined ? {} : { name: { $regex: query, $options: 'i' } },
            query === undefined ? {} : { type: { $regex: query, $options: 'i' } },
        ]
    };

    if(category !== undefined){
        searchQuery = {
            $or: [
                category === undefined ? {} : { type: { $regex: category, $options: 'i' } },
            ]
        };
    }

    // Check if the popular parameter is present in the query string
    if (popular === 'true') {
        // Sort by the "likes" attribute in descending order (Z-A)
        searchQuery.$sort = { likes: -1 };
        searchQuery.$limit = 8
    }


    // Check if the popular parameter is present in the query string
    if (types === 'true') {
        try {
            const menus = await Menu.aggregate([
                { $group: { _id: '$type', menu: { $first: '$$ROOT' } } },
                { $sort: { _id: 1 } }
            ]);
    
            const result = menus.map((menu) => menu.menu);
            console.log(result);

            res.send(result);
        } catch (error) {
            next(new Error(JSON.stringify(error)));
        }
    }
    else {
        // Find all menus matching the search query
        Menu.find(searchQuery).exec(function (error, result) {
            if (error) {
                // Return error if any occurred
                return next(new Error(JSON.stringify(error.errors)));
            } else {
                // Return the results
                console.log(result);
                res.send(result);
            }
        });
    }
};





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

