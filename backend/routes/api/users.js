const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSignup = [
  // check('firstName')
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 2 })
  //   .withMessage('Please provide a name'),
  // check('lastName')
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 2 })
  //   .withMessage('Please provide a name'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];
//signup a user?
router.post(
  '/',
  validateSignup,
  handleValidationErrors,
  async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const userWithEmail = await User.findOne({
      where: {
        email
      }
    })
    if (userWithEmail){
      res.status(403)
      return res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "email": "User with that email already exists"
        }
      })
    }
    const userWithUserName = await User.findOne({
      where: {
        username
      }
    })
    if (userWithUserName){
      res.status(403)
      return res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "username": "User with that username already exists"
        }
      })
    }
    const user = await User.signup({ firstName, lastName, email, username, password });
    let token =  setTokenCookie(res, user);
 
    if (token){
    // user.toJSON()
   user.dataValues.token = token
    }
   
    return res.json(user);
  }
);
module.exports = router;