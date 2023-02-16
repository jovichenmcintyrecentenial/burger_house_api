//error handle for handling errors
//express automatically knows this is an error handle because it has 4 paramenter instead of 3
var errorMiddleware = (err, req, res, next) => {
    //if BaseError object has status then use that code else use 500
    res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        message: err.message,
    });

};

module.exports = errorMiddleware