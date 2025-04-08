const agenda = require("../config/agenda")


const sendEmail = async (body) => {
    try {
       if (!body || typeof body !== 'object') {
        throw new Error('Invalid email data: body must be an object');
      }
  
       const {
        recipient = '',
        subject = '',
        html = '',
        sendAt = new Date()
      } = body;
  
       if (!recipient) {
        throw new Error('Recipient email address is required');
      }
  
       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
        throw new Error('Invalid recipient email format');
      }
  
     
  
       await agenda.schedule(
        sendAt,
        'send email',
        {
          to:recipient,
          subject: subject || '(No subject)',
          html: html || '<p></p>' 
        }
      );
  
      return sendAt;
    } catch (err) {
      console.error('Failed to schedule email:', err);
      throw err; 
    }
  };
  
  module.exports = { sendEmail };
