import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TagsInput from 'react-tagsinput'
import { connect } from 'react-redux'

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    age: '',
    gender: '',
    location: '',
    website: '',
    bio: '',
    recordingExperience: '',
    yearsPlayedMusic: '',
    gigsPlayed: '',
    availableToRehearse: '',
    availableToGig: '',
    lookingForBand: null,
    lookingForBandmates: null,
    instruments: [],
    genres: [],
    facebook: '',
    twitter: '',
    youtube: '',
    soundcloud: '',
    bandcamp: '',
    errors: {}
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleInstrumentsTagChange = (tags) => {
    this.setState({ instruments: tags })
  }

  handleGenresTagChange = (tags) => {
    this.setState({ genres: tags })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
  }

  render() {
    const { errors } = this.state

    return (
      <div className="create-profile-container max-width-form">
        <div className="form-container">
          <div className="form-inner">
            <form id="create-profile-form" action="" onSubmit={this.handleSubmit} noValidate>
              <h1 className="form-header">Create your profile</h1>
              <small>* = required fields</small>
              <div className="form-body">
                <div>
                  <label>* Handle</label>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.handle}
                    name="handle"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label>Age</label>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.age}
                    name="age"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label>Gender</label>
                  <select className="form-select" value={this.state.gender} onChange={this.handleChange} name="gender">
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label>Location</label>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.location}
                    name="location"
                    autoComplete="off"
                  />
                </div>
                <div className="grid-full-width">
                  <label>Instruments</label>
                  <TagsInput
                    onChange={this.handleInstrumentsTagChange}
                    value={this.state.instruments}
                    name="instruments"
                    inputProps={{ placeholder: 'Add an Instrument' }}
                  />
                </div>
                <div className="grid-full-width">
                  <label>Genres</label>
                  <TagsInput
                    onChange={this.handleGenresTagChange}
                    value={this.state.genres}
                    name="genres"
                    inputProps={{ placeholder: 'Add a Genre' }}
                  />
                </div>
              </div>
              <button className="button button-darkblue" type="submit">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps)(CreateProfile)
