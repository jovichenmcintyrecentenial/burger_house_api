//get imports
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const Order = require('../models/orderModel.js');
const Menu = require('../models/menuModel.js');
const error = require('./../utils/errors.js');
const Fee = require('../models/feeModel.js');

//get current login in user information
module.exports.getOrders = async (req, res, next) => {
    
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
module.exports.addOrder = async (req, res, next)  => {

    //extract arguements from request body
    const{menu_items_ids} = req.body;

    try {
        // Query the database to find the orders with the specified IDs
        const menus = await Menu.find({
            _id: {
                $in: menu_items_ids.map(id => mongoose.Types.ObjectId(id))
            }
        });
        console.log('Found orders:', menus);
        
        //calculate total cost
        let totalCost = 0;
        menus.forEach(menu => {
            totalCost += menu.price;
        });

        const deliveryFee = new Fee({
            name: 'Delivery fee',
            price: 5.99
        });

        
        const serviceFee = new Fee({
            name: 'Service fee',
            price: 5.99
        });

        await deliveryFee.save(); // Save the fee to the database
      
        // Create the tax fee object
        const taxRate = 0.07; // 7% tax rate

        const taxFee = new Fee({
            name: 'Tax',
            price: totalCost * taxRate // Calculate the tax based on the total cost
        });

        // Creating new menu item.
        var newOrder = new Order({
            menu_items: menus,
            fees: [deliveryFee,serviceFee,taxFee],
            // deliver: deliver,
            customer_id: req.userId,
            // total: is_active,
            // is_delivered:is_delivered,
        });

        // Create the patient and saving to db
        newOrder.save(function (err, result) {

            //if error return error
            if (err) return error.Error(req,res,next,JSON.stringify(err))
            console.log(result)

            //return newly created menu if added successfully
            return res.status(201).send(result)


        })

    } catch (err) {
        console.error(err);
    }


    return true;
}

