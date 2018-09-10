const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load validation
const validateProfileInput = require('../../validation/profile')

// Load models
const User = require('../../models/User')
const Profile = require('../../models/Profile')

// @route    GET api/profile
// @desc     Get current user's profile
// @access   Private
router.get('/', passport.authenticate('jwt', { session: false }),  (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(error => res.status(404).json(error))
})

// @route    GET api/profile/all
// @desc     Get all profiles
// @access   Public
router.get('/all', (req, res) => {
  const errors = {}
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noProfiles = 'No profiles'
        return res.status(404).json(errors)
      }
      res.json(profiles)
    })
    .catch(error => res.status(404).json({ profiles: 'No profiles' }))
})

// @route    GET api/profile/handle/:handle
// @desc     Get profile by handle
// @access   Public
router.get('/handle/:handle', (req, res) => {
  const errors = {}
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(error => res.status(404).json(error))
})

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(error => res.status(404).json({ profile: 'There is no profile for this user' }))
})

// @route    POST api/profile
// @desc     Create user profile
// @access   Private
router.post('/', passport.authenticate('jwt', { session: false }),  (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body)
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  // Get fields
  const profileFields = {}
  profileFields.user = req.user.id
  if (req.body.handle) profileFields.handle = req.body.handle
  if (req.body.age) profileFields.age = req.body.age
  if (req.body.gender) profileFields.gender = req.body.gender
  if (req.body.location) profileFields.location = req.body.location
  if (req.body.website) profileFields.website = req.body.website
  if (req.body.bio) profileFields.bio = req.body.bio
  if (req.body.recordingExperience) profileFields.recordingExperience = req.body.recordingExperience
  if (req.body.yearsPlayedMusic) profileFields.yearsPlayedMusic = req.body.yearsPlayedMusic
  if (req.body.gigsPlayed) profileFields.gigsPlayed = req.body.gigsPlayed
  if (req.body.availableToRehearse) profileFields.availableToRehearse = req.body.availableToRehearse
  if (req.body.availableToGig) profileFields.availableToGig = req.body.availableToGig
  if (req.body.lookingForBand) profileFields.lookingForBand = req.body.lookingForBand
  if (req.body.lookingForBandmates) profileFields.lookingForBandmates = req.body.lookingForBandmates

  // Instruments - Split into an Array
  if (typeof req.body.instruments !== undefined) {
    profileFields.instruments = req.body.instruments.split(',')
  }

  // Genres - Split into an Array
  if (typeof req.body.genres !== undefined) {
    profileFields.genres = req.body.genres.split(',')
  }

  // Social
  profileFields.social = {}
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube
  if (req.body.soundcloud) profileFields.social.soundcloud = req.body.soundcloud
  if (req.body.bandcamp) profileFields.social.bandcamp = req.body.bandcamp

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (profile) {
        // Update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        .then(profile => res.json(profile))
      } else {
        // Create profile
        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle })
          .then(profile => {
            if (profile) {
              errors.handle = 'Handle already exists'
              res.status(400).json(errors)
            }
            // Save profile
            new Profile(profileFields).save().then(profile => res.json(profile))
          })
      }
    })
    .catch(error => res.status(400).json(error))
})

// @route    DELETE api/profile
// @desc     Delete user and profile
// @access   Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id })
    .then(()  => {
      User.findOneAndRemove({ _id: req.user.id })
        .then(() => res.json({ success: true }))
        .catch(error => res.status(400).json(error))
    })
    .catch(error => res.status(400).json(error))
})

module.exports = router