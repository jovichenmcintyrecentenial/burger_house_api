//get imports
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const Address = require('../models/addressModel.js');

const error = require('./../utils/errors.js')

//get current login in user information
module.exports.getMyUser = async (req, res, next) => {
    
    //find user recent activty in database based on user id
    User.findOne({ _id: req.userId }).exec(function (error, user) {
        
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
module.exports.addUser = async (req, res, next)  => {

    //extract arguements from request body
    const{first_name, last_name,email_address,password} = req.body;

    //check if first_name is define and return error if necessary
    if(first_name === undefined){
        return error.InvalidArgument(req,res,next,'first_name');
    }
    //check if last_name is define and return error if necessary
    if(last_name === undefined){
        return error.InvalidArgument(req,res,next,'last_name');
    }
    //check if email_address is define and return error if necessary
    if(email_address === undefined){
        return error.InvalidArgument(req,res,next,'email_address');
    }

    //check if password is define and return error if necessary
    if(password === undefined){
        return error.InvalidArgument(req,res,next,'password');
    }
    
    // Creating new patient.
    var newUser = new User({
        first_name: first_name,
        last_name: last_name,
        type: 'customer',
        password: password,
        email: email_address
    });

    // Create the patient and saving to db
    newUser.save(function (err, result) {

        //if error return error
        if (err) return error.Error(req,res,next,JSON.stringify(err))
        console.log(result)

        //return newly created patient if added successfully
        return res.status(201).send(result)


    })

    return true;
}

//handler for creating new user activity
module.exports.addUserAddress = async (req, res, next)  => {

    //extract arguements from request body
    const{address, latitude,longitude} = req.body;

    //check if first_name is define and return error if necessary
    if(address === undefined){
        return error.InvalidArgument(req,res,next,'address');
    }
    //check if last_name is define and return error if necessary
    if(latitude === undefined){
        return error.InvalidArgument(req,res,next,'latitude');
    }
    //check if email_address is define and return error if necessary
    if(longitude === undefined){
        return error.InvalidArgument(req,res,next,'longitude');
    }

    User.findOne({ _id: req.userId }).exec(async function (error, user) {
        
        //Creating new patient.
        var newAddress = new Address({
            address:address,
            latitude:latitude,
            longitude:longitude
        });

        //if patient found bring user object
        if (user) {
            user.addresses.push(newAddress)
            await user.save(function (err, result) {

                //if error return error
                if (err) return error.Error(req,res,next,JSON.stringify(err))
                
                console.log(user.addresses[user.addresses.length-1])
                return res.send(user.addresses[user.addresses.length-1])
            })
        } 
    })

}


