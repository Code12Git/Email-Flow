const {fromEnv} = require('../utils')

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: fromEnv('EMAIL_USER'),
      pass: fromEnv('EMAIL_PASS')
    }
  });

async function sendEmail(emailData) {
     const {subject,recipient,html}= emailData
   const info = await transporter.sendMail({
    to: recipient,
    subject: subject, 
    html: html
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = {sendEmail}