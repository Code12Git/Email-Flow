const { responseManager, flowManager } = require("../services")

const flow = async(request,response) => {
    try{
        const result = await flowManager.flow(request.body)
        return responseManager.sendSuccessResponse(response,result,'Flow sent successfully')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error sending flow')
    }
}

module.exports = { flow }