const { emailManager,responseManager } = require("../services")

const sendEmail = async(request,response) => {
    try{
        const result = await emailManager.sendEmail(request.body)
        return responseManager.sendSuccessResponse(response,result,'Email sent successfully')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error login user')
    }
}

module.exports = { sendEmail }