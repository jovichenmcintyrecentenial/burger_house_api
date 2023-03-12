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

//verify order
module.exports.verifyOrder = async (req, res, next) => {
    
    //if id path no set then return an error
    if(req.params.id === undefined){
        return error.InvalidPath(req,res,next,'id')
    }

    console.log(req.body)
    
    //find and update a patient in database based on user id
    Order.findOneAndUpdate({ _id: req.params.id },
        {is_verified:true},{returnOriginal: false}).exec(function (error, patient) {
        
        //if error return the error response
        if (error) return next(new Error(JSON.stringify(error.errors)))

        //if order found bring patient object
        if (patient) {
            console.log(patient)
            res.send(patient)
        } else 
        //if unable to find patient return 404
        {
            console.log('Not Founded')
            res.sendStatus(404)
        }
    })
}


//handler for creating new user activity
module.exports.createOrder = async (req, res, next)  => {

    //extract arguements from request body
    const{menu_items_ids,estimate} = req.body;

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
        const taxRate = 0.15; // 7% tax rate

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

        if(estimate === true) {
            return res.status(201).send(newOrder)
        }
        else{
            // Create the patient and saving to db
            newOrder.save(function (err, result) {

                //if error return error
                if (err) return error.Error(req,res,next,JSON.stringify(err))
                console.log(result)

                //return newly created menu if added successfully
                return res.status(201).send(result)


            })
        }

    } catch (err) {
        console.error(err);
    }


    return true;
}

