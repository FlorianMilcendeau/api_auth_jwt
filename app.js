const express = require('express');
const logger = require('morgan');

const compression = require('compression');
const helmet = require('helmet');

const { verifyToken } = require('./middlewares/verifyToken');

const app = express();

const root = require('./routes');

app.use(express.json());
app.use(logger('dev'));
app.use(helmet());
app.use(compression());

/** Main Route */
app.use('/api', root);

/** Test middleware token */
app.get('/api/test', verifyToken, (req, res) => {
    res.status(200).json(req.user);
});

module.exports = app;
