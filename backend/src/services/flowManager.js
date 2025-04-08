const { sendEmail } = require("./emailManager");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const flow = async (body) => {
  try {
    const flow = body;
    const data = await executeFlow(flow);
    return data;
  } catch (error) {
    throw error;
  }
};

const executeFlow = async (flow) => {
  try {
    const sortedNodes = [...flow].sort((a, b) => a.position.y - b.position.y);

    for (const node of sortedNodes) {

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

    return { success: true };
  } catch (error) {
    console.error("Flow execution failed:", error);
    throw error;
  }
};

module.exports = { flow };
