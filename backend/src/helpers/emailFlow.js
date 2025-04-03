const nodemailer = require('nodemailer');
const agenda = require('../config/agenda');
const { fromEnv } = require('../utils');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: fromEnv('EMAIL_USER'),
    pass: fromEnv('EMAIL_PASS')
  }
});

agenda.define('send email', async (job) => {
  const { to, subject, html } = job.attrs.data;
  
  try {
    await transporter.sendMail({
      from: `<${fromEnv('EMAIL_USER')}>`,
      to,
      subject,
      html
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
});