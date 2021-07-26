const router = require('express').Router();
const bcrypt = require('bcrypt');
const logger = require('debug');

const User = require('../database/models/index').user;
const validator = require('../middlewares/validator');
const { generateToken } = require('../libs/jsonWebToken');
const generatePassword = require('../libs/password');
const { signInShema, signUpShema } = require('../validation/Authentication');

const log = logger('api:controller:authenticate');

/** Route sign In */
router.post('/sign-in', validator(signInShema), async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ where: { email }, raw: true });

    // If user does not exist.
    if (!user) {
      return res.status(401).json({ success: false, message: 'Account does not exist' });
    }

    const { password: hash, ...currentUser } = user;
    const hashValid = await bcrypt.compare(password, hash);

    // If the password is incorrect.
    if (!hashValid) {
      return res.status(401).json({ success: false, message: 'Password incorrect' });
    }

    const { token, expiresIn } = generateToken(user);

    // Connect successfully.
    return res.status(200).json({
      success: true,
      user: currentUser,
      token: {
        jwt: token,
        expiresIn,
      },
    });
  } catch (error) {
    log(error);

    return res.status(500).json({ success: false, message: error.sqlMessage, sql: error.sql });
  }
});

/** Route sign Up */
router.post('/sign-up', validator(signUpShema), async (req, res) => {
  try {
    const { password, ...userInfo } = req.body;
    const user = await User.findOne({ where: { email: userInfo.email }, raw: true });

    // If user exist.
    if (user) {
      return res.status(401).json({ success: false, message: 'Account already exist' });
    }

    const hash = await generatePassword(password);
    const resultEntity = await User.create({ password: hash, ...userInfo }, { raw: true });
    const result = resultEntity.get({ plain: true });

    // If user is not create.
    if (!result) {
      return res.status(400).json({ success: false, message: 'Error create account' });
    }

    const { password: pwd, ...currentUser } = result;
    const { token, expiresIn } = generateToken(currentUser);

    // User created successfully.
    return res.status(201).json({
      success: true,
      user: currentUser,
      token: {
        jwt: token,
        expiresIn,
      },
    });
  } catch (error) {
    log(error);

    return res.status(500).json({ success: false, message: error.sqlMessage, sql: error.sql });
  }
});

router.get('/logOut', () => {
  /** TODO */
});

module.exports = router;
