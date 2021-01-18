const router = require('express').Router();
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const {
  verifyBodySingUp,
  verifyBodySingIn,
} = require('../middlewares/verifyBody');

const User = require('../models/User');
const { generateToken } = require('../utils/JWT');
const generatePassword = require('../utils/password');

/** Route sign In */
router.post('/signIn', verifyBodySingIn, async (req, res) => {
  const errors = validationResult(req);

  // If there are any errors
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { password, email } = req.body;

  try {
    // I search user
    const user = await User.findOne({ email });

    // If user does not exist.
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Account does not exist',
      });
    }

    const { password: hash, ...currentUser } = user;

    // Verify password
    const hashValid = await bcrypt.compare(password, hash);

    // If the password is incorrect.
    if (!hashValid) {
      return res.status(401).json({
        success: false,
        message: 'Password incorrect',
      });
    }

    // Generate and sign jwt.
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
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.sqlMessage,
      sql: error.sql,
    });
  }
});

/** Route sign Up */
router.post('/signUp', verifyBodySingUp, async (req, res) => {
  const errors = validationResult(req);

  // If there are any errors
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { password, ...userInfo } = req.body;

  try {
    // I search user
    const user = await User.findOne({ email: userInfo.email });

    // If user exist.
    if (user) {
      return res.status(401).json({
        success: false,
        message: 'Account already exist',
      });
    }

    // hash password.
    const hash = await generatePassword(password);

    // Create user.
    const result = await User.create({ password: hash, ...userInfo });

    // If user is not create.
    if (!result.affectedRows) {
      return res.status(400).json({
        success: false,
        message: 'Error create account',
      });
    }

    // I get id of user created.
    const { insertId } = result;

    const currentUser = {
      id: insertId,
      ...userInfo,
    };

    // Generate and sign jwt.
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
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.sqlMessage,
      sql: error.sql,
    });
  }
});

router.get('/logOut', () => {
  /** TODO */
});

module.exports = router;
