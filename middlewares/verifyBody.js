const { body } = require('express-validator');

const verifyEmail = [body('email').isEmail().withMessage('e-mail is required')];

const verifyBodySingIn = [
  body('email').isEmail().withMessage('e-mail is wrong'),
  body('password').isLength({ min: 8 }).withMessage('must be at least 8 char long'),
];

const verifyBodySingUp = [body('name').isLength({ min: 2 }), ...verifyBodySingIn];

module.exports.verifyBodySingUp = verifyBodySingUp;
module.exports.verifyBodySingIn = verifyBodySingIn;
module.exports.verifyEmail = verifyEmail;
