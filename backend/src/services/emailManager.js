const agenda = require("../config/agenda")


const sendEmail = async(body) => {
    try{
        const {to,subject,html,sendAt} = body
        await agenda.schedule(sendAt,'send email',{
            to,
            subject,
            html
        })
        return sendAt;
    }catch(err){
        throw err;
    }
}

module.exports = {sendEmail}