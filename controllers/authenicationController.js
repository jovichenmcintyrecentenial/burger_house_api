//get imports
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const error = require('./../utils/errors.js')
//promisify used to make function that usually use a callback only become awaitable
const { promisify } = require('util');


//create JWT token with user's id and user's name
const createToken = (id,name,user) => {
    //sign token using a JWT secert key with an expiration duration
    return jwt.sign(
        {
            id,
            name,
            user
        },
        process.env.JWT_KEY,
        {
            expiresIn: process.env.JWT_EXPIRY,
        },
    );
};

//handle for login using email address and password
module.exports.login = async (req, res, next) => {
    const{email, password} = req.body;

    //error handle for missing email field
    if(email === undefined){
        return error.InvalidArgument(req,res,next,'email')
    }
    //error handle for missing password field
    else if(password === undefined){
        return error.InvalidArgument(req,res,next,'password')
    }
    else{

        //find user based on email address
        const user = await User.findOne({
            email,
        }).select('+password');
        //if that user don't exist or the password on that user don't matches the password from request then response with error
        if(!user || password != user.password){
            console.log('Invalid email or password')
            return error.Error(req,res,next,'Invalid email or password')

        }
        //if user exist and password match
        else{
            //strip user object
            user.password = undefined
            user.activities = undefined
            user.__v = undefined
            user.createdAt = undefined
            user.updatedAt = undefined



            //response with token as json
            var token = createToken(user._id,user.name,user)
            console.log({token:token})
            res.send({token:token})
        }
    }
}

//handle that is use to ensure that a token is present and is valid
module.exports.gaurd = async (req, res, next) => {
    //create authorization value form request header
    const{authorization} = req.headers

    //if authorization present then extract the token from authorization value
    if(authorization !== undefined){
        //split string
        let splits = authorization.split(' ');
        //if this has 2 item in the split and first elenemt = Bearer
        if(splits.length == 2 && splits[0] == 'Bearer'){
            //save token in token varible based on split
            let token = splits[1]
            //if token doesn't exist then response with 401 Unauthorized
            if(!token){
                return error.Unauthorized(req,res,next)
            }
            //if there is some value in token
            else{
                try{
                    //try to await the JWT token verification
                    const decode = await promisify(jwt.verify)(token, process.env.JWT_KEY);

                    //if unable to decode token based on our JWT_KEY then response Unauthorized
                    if(!decode){
                        return error.Unauthorized(req,res,next)
                    }
                    //if token decode means it verifid and everything is good
                    else{
                        //store userId id and user name in request
                        req.userId = decode.id
                        req.userName = decode.name
                        req.user = decode.user

                        //move on to next handle
                        return next()
                    }
                } catch (err) {
                    //catch error if invalid signature
                    return next(err);
                }
                
            }

        }

    }
    
    return error.Unauthorized(req,res,next)
   
   
}