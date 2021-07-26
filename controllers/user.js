const router = require('express').Router();
const User = require('../database/models').user;
const { sendMail } = require('../service/email');

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email }, raw: true });

  if (!user) {
    return res.status(401).json({ success: false, message: 'Account does not exist' });
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Nodemailer API',
    text: 'Hi from your nodemailer API',
  };
  sendMail(mailOptions);

  return res.end();
});

module.exports = router;
