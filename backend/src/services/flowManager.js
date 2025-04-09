const { sendEmail } = require("./emailManager");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const flow = async (body) => {
  try {
    const data = await executeFlow(body);
    return data;
  } catch (error) {
    console.error("Flow processing failed:", error);
    throw error;
  }
};

const executeFlow = async (flow) => {
  try {
    if (!flow || !Array.isArray(flow.nodes)) {
      throw new Error("Invalid flow structure: expected 'nodes' array");
    }
    const sortedNodes = [...flow.nodes].sort((a, b) => a.position?.y - b.position?.y);

    for (const node of sortedNodes) {
      if (!node || typeof node !== 'object') {
        console.error("Invalid node encountered, skipping");
        continue;
      }

      switch (node.type) {
        case "emailNode": {
          if (!node.data?.emailData) {
            console.error("Email node missing emailData");
            continue;
          }

          const { recipient, subject, html } = node.data.emailData;

          if (!recipient) {
            console.error("Email node missing recipient");
            continue;
          }

          const emailContent = {
            recipient,
            subject: subject || "No Subject",
            html: html || "<p>No content</p>",
          };

          await sendEmail(emailContent);
          break;
        }

        case "waitTimeNode": {
          const { hours = 0, minutes = 0 } = node.data?.time || {};
          const waitMs = (hours * 3600 + minutes * 60) * 1000;

          await delay(waitMs);
          break;
        }

        default:
          console.log(`Skipping unknown node type: ${node.type}`);
      }
    }

    return { success: true, message: "Flow executed successfully" };
  } catch (error) {
    console.error("Flow execution failed:", error);
    throw new Error(`Flow execution failed: ${error.message}`);
  }
};

module.exports = { flow };