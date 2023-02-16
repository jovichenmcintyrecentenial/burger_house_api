//classed use for create response errors with status code and a message
class BaseError extends Error {

    constructor( message,statusCode) {
        super(message)
        this.error = message
        this.statusCode = statusCode
    } 
}

//function to send baseError model if triggered
function returnError(req,res,next,baseError){
    next(baseError,req,res,next)
}

//create custom response error with predefine parameter
module.exports.InvalidArgument = (req,res,next,message) => returnError(req,res,next,(new BaseError(message+' is not speificed',400)))
module.exports.Error = (req,res,next,message) => returnError(req,res,next,(new BaseError(message,400)))
module.exports.Unauthorized = (req,res,next) => returnError(req,res,next,(new BaseError('Unauthorized',401)))
module.exports.InvalidPath = (req,res,next,message) => returnError(req,res,next,(new BaseError('path '+message+' is not speificed',400)))



