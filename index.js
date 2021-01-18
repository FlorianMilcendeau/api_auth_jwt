const app = require('./app');

const PORT = process.env.PORT || 8000;

module.exports = app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${PORT}`);
  }
});
