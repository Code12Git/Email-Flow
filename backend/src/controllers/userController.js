    const { userManager,responseManager } = require("../services")

const register = async(request,response) => {
    try{
        const result = await userManager.register(request.body);
        return responseManager.sendSuccessResponse(response,result,'User registered successfully!')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error registering user')
    }
}

const login = async(request,response) => {
    try{
        const result = await userManager.login(request.body)
        return responseManager.sendSuccessResponse(response,result,'User login successfull')
    }catch(err){
        return responseManager.sendErrorResponse(response,err,'Error login user')
    }
}

module.exports = { register , login }