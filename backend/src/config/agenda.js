const Agenda = require('agenda');
const {fromEnv} = require('../utils');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: fromEnv('EMAIL_USER'),
    pass: fromEnv('EMAIL_PASS')
  }
});

const agenda = new Agenda({
  db: { address: fromEnv('NOSQL_DATABASE_URL'), collection: 'emailJobs' },
  processEvery: '1 minute'
});

agenda.define('send email', async (job) => {
  const { to, subject, html } = job.attrs.data;
  
  try {
    await transporter.sendMail({
      from: `"Your App" <${fromEnv('EMAIL_USER')}>`,
      to,
      subject,
      html
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
});

agenda.on('ready', () => {
  agenda.start();
  console.log('Agenda started');
});

agenda.on('error', (err) => {
  console.error('Agenda connection error:', err);
});

module.exports=agenda;