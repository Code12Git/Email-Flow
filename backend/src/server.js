const express = require('express')
const { fromEnv } = require('./utils')
const { logger } = require('./utils')
const connectDB = require('./config')
const routes = require('./routes')
const cors = require('cors')
const app = express();
const PORT = fromEnv('PORT') || 3002;
connectDB();
app.use(express.json())
app.use(cors())
app.use(routes)

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.listen(PORT, () => {
  logger.info(`🚀Server running at PORT: ${PORT}`);
});