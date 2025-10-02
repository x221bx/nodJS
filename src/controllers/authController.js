const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, getByEmail } = require('../models/userModel');
const { JWT_SECRET } = require('../config/constants');
const authSchemas = require('../validation/authSchemas');

async function signup(req, res) {
  try {
    const { error, value } = authSchemas.signup.body.validate(req.body || {}, { abortEarly: false, stripUnknown: true });
    if (error) return res.status(400).json({ message: 'Validation error', details: error.details.map(d => d.message) });
    const { name, email, password } = value;
    const user = await createUser({ name, email, password });
    return res.status(201).json({ user });
  } catch (err) {
    return res.status(400).json({ message: err.message || 'Signup failed' });
  }
}

async function signin(req, res) {
  try {
    const { error, value } = authSchemas.signin.body.validate(req.body || {}, { abortEarly: false, stripUnknown: true });
    if (error) return res.status(400).json({ message: 'Validation error', details: error.details.map(d => d.message) });
    const { email, password } = value;
    const user = await getByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(500).json({ message: 'Signin failed' });
  }
}

module.exports = { signup, signin };
