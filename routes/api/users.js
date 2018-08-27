const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

// Load User model
const User = require('../../models/User')

// @route    POST api/users/register
// @desc     Register user
// @access   Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: 'E-mail already exists' })
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',       // Size
          r: 'pg',        // Rating
          default: 'mm'   // Default
        })
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        })
        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) throw error
            newUser.password = hash
            newUser.save()
              .then(user => res.json(user))
              .catch(error => console.log(error))
          })
        })
      }
    })
    .catch(error => console.log(error))
})

// @route    POST api/users/login
// @desc     Login user / Returning JWT
// @access   Public
router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  // Find user by email
  User.findOne({ email })
    .then(user => {
      // Check for user
      if (!user) {
        return res.status(404).json({ email: 'User not found' })
      }
      // Check password
      bcrypt.compare(password, user.password)
        .then(match => {
          if (match) {
            res.json({ msg: 'Success' })
          } else {
            return res.status(400).json({ password: 'Incorrect password' })
          }
        })
    })
})

module.exports = router