const{ z } = require('zod');

const emailSchema = z.object({
  from:z.string().email('Valid email is required').optional(),
  to: z.string().email('Valid email is required'),
  subject: z.string().min(1, 'Subject is required'),
  html: z.string().min(1, 'Email content is required'),
  sendAt: z
    .string()
    .datetime({ offset: true })
    .optional()
    .transform((val) => val ? new Date(val) : new Date(Date.now() + 60 * 60 * 1000)),
});


module.exports = emailSchema;