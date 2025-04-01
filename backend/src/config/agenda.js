const Agenda = require('agenda');
const {fromEnv} = require('../utils')

const agenda = new Agenda({
  db: { address: fromEnv('NOSQL_DATABASE_URL'), collection: 'emailJobs' },
  processEvery: '10 seconds'
});

agenda.on('ready', () => {
  agenda.start();
  console.log('Agenda scheduler started');
});

agenda.on('error', (err) => {
  console.error('Agenda error:', err);
});

module.exports = agenda;