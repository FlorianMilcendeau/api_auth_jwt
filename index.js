const debug = require('debug');
const app = require('./app');

const debugLog = debug('api');

const PORT = process.env.PORT || 8000;

module.exports = app.listen(PORT, (err) => {
    if (err) {
        debugLog(err);
    } else {
        debugLog(`Express server listening on ${PORT}`);
    }
});
