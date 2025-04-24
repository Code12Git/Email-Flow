const { fromEnv, logger } = require('../utils');
const Agenda = require('agenda');
const { sendEmail } = require('../services/emailManager');

class JobScheduling {
  constructor() {
    this.connectionString = fromEnv('NOSQL_DATABASE_URL');
    this.agenda = new Agenda({
      db: { address: this.connectionString },
      processEvery: '30 seconds',
      defaultConcurrency: 1,
      lockLifetime: 5 * 60 * 1000, 

    });

    this.defineFlowJob(); 
  }

  defineFlowJob() {
    this.agenda.define('processFlow',{ concurrency: 1, lockLifetime: 5 * 60 * 1000 },  async (job) => {
        const { flow, startIndex = 0 } = job.attrs.data;
      const sortedNodes = [...flow.nodes].sort((a, b) => a.position?.y - b.position?.y);
      console.log(sortedNodes)
      for (let i = startIndex; i < sortedNodes.length; i++) {
        const node = sortedNodes[i];
        if (!node || typeof node !== 'object') continue;
        switch (node.type) {
          case 'EmailNode': {
            const { recipient,subject,body } = node.data;
            if (!recipient) continue;

            await sendEmail({
              recipient: recipient,
              subject: subject || 'No Subject',
              html: body || '<p>No content</p>',
            });
            break;
          }

          case 'DelayNode': {
            const { hours = 0, minutes = 0 } = node.data || {};
            console.log(node.data,hours,minutes)
            const delayMs = (hours * 60 + minutes) * 60 * 1000;
            const nextRunAt = new Date(Date.now() + delayMs);

            if (i + 1 < sortedNodes.length) {
                await this.agenda.schedule(nextRunAt, 'processFlow', {
                  flow,
                  startIndex: i + 1,
                });
              } else {
                logger.info(' Flow execution complete (no nodes after delay)');
              }
    
              return;  
            }

          default:
            logger.warn(`Unknown node type: ${node.type}`);
        }
      }

      logger.info(' Flow execution complete');
    });
  }

  async start() {
    await this.agenda.start();
  }

  async triggerFlowNow(flow) {
    return this.agenda.now('processFlow', {
      flow,
      startIndex: 0,
    });
  }
}

const scheduling = new JobScheduling();
module.exports = scheduling;

