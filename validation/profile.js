const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data) {
  let errors = {}

  data.handle = !isEmpty(data.handle) ? data.handle : ''

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle must be between 2 and 40 characters'
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = 'Handle is required'
  }

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.soundcloud)) {
    if (!validator.isURL(data.soundcloud)) {
      errors.soundcloud = 'Not a valid URL'
    }
  }

  if (!isEmpty(data.bandcamp)) {
    if (!validator.isURL(data.bandcamp)) {
      errors.bandcamp = 'Not a valid URL'
    }
  }

  return { errors, isValid: isEmpty(errors) }
}