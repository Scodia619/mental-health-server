const express = require('express')
const cors = require('cors');
const apiRouter = require('./routes/apiRouter');
const { customErrors } = require('./errors');

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api', apiRouter)

app.use(customErrors)

module.exports = app