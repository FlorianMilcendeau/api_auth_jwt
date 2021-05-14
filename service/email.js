const { createTransport } = require('nodemailer');
const logger = require('debug');

const log = logger('api:service:email');

const transporter = createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

transporter.verify((err, success) => {
  if (err) {
    log(err);
  } else {
    log(`=== Server is ready to take messages: ${success} ===`);
  }
});

module.exports.sendMail = (mailOptions) => {
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      log(`Error: ${err}`);
    } else {
      log('Email sent successfully');
    }
  });
};
