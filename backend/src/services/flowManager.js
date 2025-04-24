const job = require('../config/agenda')

const flow = async (body) => {
  try {
    const data = await job.triggerFlowNow(body)
    return data;
  } catch (error) {
    console.error("Flow processing failed:", error);
    throw error;
  }
};

module.exports = { flow };