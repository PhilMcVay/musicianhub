const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const keys = require('../../config/keys')

// Load input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// Load User model
const User = require('../../models/User')

// @route    POST api/users/register
// @desc     Register user
// @access   Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists'
        return res.status(400).json(errors)
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
  const { errors, isValid } = validateLoginInput(req.body)
   // Check validation
   if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  // Find user by email
  User.findOne({ email })
    .then(user => {
      // Check for user
      if (!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors)
      }
      // Check password
      bcrypt.compare(password, user.password)
        .then(match => {
          if (match) {
            const payload = { id: user.id, name: user.name, avatar: user.avatar }
            // Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (error, token) => res.json({ success: true, token: `Bearer ${token}` })
            )
          } else {
            errors.password = 'Incorrect password'
            return res.status(400).json(errors)
          }
        })
    })
})

// @route    GET api/users/current
// @desc     Return current user
// @access   Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})

module.exports = router