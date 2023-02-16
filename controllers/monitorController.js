
//handler use to help monitor api request and response
var apiMonitor = async (req, res, next) => {
    //display method POST,DELETE,GET or PUT
    console.log('\n['+req.method+'] request received\n')
    //display serve and route information
    console.log(process.env.HOST+':'+process.env.MY_PORT+req.originalUrl+'\n')
    //display request body
    console.log(isEmpty(req.body)?'':req.body)

    console.log('\nRESPONSE SENT\n')

    next()
}
//check if object empty
function isEmpty(object) {  
    return Object.keys(object).length === 0
}

module.exports = apiMonitor