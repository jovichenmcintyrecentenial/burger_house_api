//get imports
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const Address = require('../models/addressModel.js');

const error = require('./../utils/errors.js');
const Card = require('../models/cardModel.js');

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

//get users address
module.exports.getMyAddresses = async (req, res, next) => {
    
    //find user recent activty in database based on user id
    User.findOne({ _id: req.userId }).exec(function (error, user) {
        
        //if error return the error response
        if (error) return next(new Error(JSON.stringify(error.errors)))

        //if patient found bring user object
        if (user) {
            console.log(user.addresses)
            return res.send(user.addresses)
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

        for(var index in user.addresses){
            var tempAddress = user.addresses[index]
            if(tempAddress.address == address){
                console.log(user.addresses[user.addresses.length-1])
                return res.send(tempAddress)
            }
        }

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

// Handler for adding a new card
module.exports.addCard = async (req, res, next) => {
    // Extract arguments from request body
    const { card_number, card_date, cvv } = req.body;
  
    // Check if card number is defined and return error if necessary
    if (card_number === undefined) {
        return error.InvalidArgument(req, res, next, 'card_number');
    }
  
    // Check if card date is defined and return error if necessary
    if (card_date === undefined) {
        return error.InvalidArgument(req, res, next, 'card_date');
    }
  
    // Check if cvv is defined and return error if necessary
    if (cvv === undefined) {
        return error.InvalidArgument(req, res, next, 'cvv');
    }
  
    // Find the user based on the authenticated user ID
    User.findOne({ _id: req.userId }).exec(async function (error, user) {
        // Create a new card
        var newCard = new Card({
            card_number: card_number,
            card_date: card_date,
            cvv: cvv,
        });
  
        // Check if the user already has the same card
        for (var index in user.cards) {
            var tempCard = user.cards[index];
            if (tempCard.card_number == card_number) {
                console.log(user.cards[user.cards.length - 1]);
                return res.send(tempCard);
            }
        }
  
        // If the user is found, add the new card to the user's list of cards
        if (user) {
            user.cards.push(newCard);
            await user.save(function (err, result) {
                // If there's an error, return the error message
                if (err) return error.Error(req, res, next, JSON.stringify(err));
  
                console.log(user.cards[user.cards.length - 1]);
                return res.send(user.cards[user.cards.length - 1]);
            });
        }
    });
};

// Handler for deleting a card
module.exports.deleteCard = async (req, res, next) => {
    // If card ID path parameter is not set, return an error
    if (req.params.id === undefined) {
        return error.InvalidPath(req, res, next, 'id');
    }
  
    try {
        // Find the user by ID and the card by ID in the cards array
        const user = await User.findOne({ _id: req.userId });
        const card = user.cards.id(req.params.id);
  
        if (!card) {
        // If the card is not found, return an error response
            return res.status(404).json({ message: 'Card not found' });
        }
  
        // Remove the card from the cards array and save the updated user object
        card.remove();
        await user.save();
  
        // Return a success response
        return res.status(200).json({ message: 'Card deleted successfully' });
    } catch (err) {
        // Handle any errors that occur
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//delete a single patient information
module.exports.deleteUserAddress = async (req, res, next) => {

    //if id path no set then return an error
    if(req.params.id === undefined){
        return error.InvalidPath(req,res,next,'id')
    }

    try {
        // Find the user by ID and the address by ID in the addresses array
        const user = await User.findOne({ _id: req.userId });
        const address = user.addresses.id(req.params.id);
    
        if (!address) {
            // If the address is not found, return an error response
            return res.status(404).json({ message: 'Address not found' });
        }
    
        // Remove the address from the addresses array and save the updated user object
        address.remove();
        await user.save();
    
        // Return a success response
        return res.status(200).json({ message: 'Address deleted successfully' });
    } catch (err) {
        // Handle any errors that occur
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

}


// Handler for getting all cards associated with a user
module.exports.getMyCards = async (req, res, next) => {
    // Find the user based on the authenticated user ID
    User.findOne({ _id: req.userId }).exec(function (error, user) {
        // If there's an error, return the error message
        if (error) return next(new Error(JSON.stringify(error.errors)));
  
        // If the user is found, return the list of cards associated with the user
        if (user) {
            console.log(user.cards);
            return res.send(user.cards);
        }
    });
};