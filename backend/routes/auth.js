const Router = require('express').Router;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');
const User = require('../models/user');

const router = module.exports = new Router();

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!(firstName && lastName && email && password)) {
    res.status('400').json({ message: 'Invalid user data' });
  }

  const user = new User({
    firstName,
    lastName,
    email,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.json(null);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(401).json({ message: 'Email or password is invalid' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: 'Email or password is invalid' });
  }

  const isAuthorized = await bcrypt.compare(password, user.password);
  if (!isAuthorized) {
    res.status(401).json({ message: 'Email or password is invalid' });
  }

  const tokenData = {
    userId: user.id,
    email: user.email,
    nonce: Date.now(),
  };
  const token = jwt.sign(tokenData, JWT_SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({
    user,
    token,
    expiresIn: 3600,
  });
});
