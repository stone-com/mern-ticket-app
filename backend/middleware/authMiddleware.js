const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from the header
      token = req.headers.authorization.split(' ')[1];
      // verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('token Id:' + decoded.id);
      // Get user from token, without the password
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  }
});

module.exports = { protect };
