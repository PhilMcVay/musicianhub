const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: { type: String, required: true, max: 40 },
  age: { type: Number },
  gender: { type: String },
  location: { type: String },
  website: { type: String },
  bio: { type: String },
  recordingExperience: { type: String },
  yearsPlayedMusic: { type: Number },
  gigsPlayed: { type: String },
  availableToRehearse: { type: Number },
  availableToGig: { type: Number },
  lookingForBand: { type: Boolean },
  lookingForBandmates: { type: Boolean },
  instruments: { type: [String] },
  genres: { type: [String] },
  social: {
    facebook: { type: String },
    twitter: { type: String },
    youtube: { type: String },
    soundcloud: { type: String },
    bandcamp: { type: String }
  },
  date: { type: Date, default: Date.now }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)