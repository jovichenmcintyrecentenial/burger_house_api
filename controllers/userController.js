//get imports
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const error = require('./../utils/errors.js')



//get all activities for users
module.exports.getUserMyActivities = async (req, res, next) => {
    
    //find user recent activty in database based on user id
    User.findOne({ _id: req.userId }).select('+activities').exec(function (error, user) {
        
        //if error return the error response
        if (error) return next(new Error(JSON.stringify(error.errors)))

        //if patient found bring patient object
        if (user) {
            console.log(user.activities)
            res.send(user.activities)
        } else 
        //if unable to find patient return 404
        {
            console.log('Not Founded')
            res.send(404)
        }
    })
}

//get current login in user information
module.exports.getMyUser = async (req, res, next) => {
    
    //find user recent activty in database based on user id
    User.findOne({ _id: req.userId }).select('+activities').exec(function (error, user) {
        
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
module.exports.createActivity = async (user_id,activity_type, image, title,related_id) => {
    //extract arguements from request body

    //check if activity_type is define and return error if necessary
    if(activity_type === undefined){
        throw new Error('undefined activity_type');
    }
    //check if title is define and return error if necessary
    if(title === undefined){
        throw new Error('undefined title');
    }
    //check if related_id is define and return error if necessary
    if(related_id === undefined){
        throw new Error('undefined related_id');
    }

    //create new activity model 
    var newActivity = {
        activity_type: activity_type,
        image: image,
        title:title,
        related_id: related_id,
    };

    //find user based on id
    const user = await User.findOne({
        _id: user_id,
    }).select('+activities');
    //add activity to user object
    user.activities.push(newActivity)
    //save user data to database
    await user.save();

    return true;
}

