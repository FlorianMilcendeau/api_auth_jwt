const express = require('express');
const logger = require('morgan');

const { verifyToken } = require('./middlewares/verifyToken');

const app = express();
const PORT = process.env.PORT || 8000;

const root = require('./routes');

app.use(express.json());
app.use(logger('dev'));

/** Main Route */
app.use('/api', root);

/** Test middleware token */
app.get('/api/test', verifyToken, (req, res) => {
  res.status(200).json(req.user);
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${PORT}`);
  }
});

module.exports = app;
