import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TagsInput from 'react-tagsinput'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import isEmpty from '../../validation/isEmpty'

class EditProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    age: '',
    gender: '',
    location: '',
    bio: '',
    yearsPlayedMusic: '',
    gigsPlayed: '',
    availableToRehearse: '',
    availableToGig: '',
    recordingExperience: false,
    lookingForBand: false,
    lookingForBandmates: false,
    instruments: [],
    genres: [],
    website: '',
    facebook: '',
    twitter: '',
    youtube: '',
    soundcloud: '',
    bandcamp: '',
    errors: {}
  }

  componentDidMount() {
    this.props.getCurrentProfile()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile

      // If profile field doesn't exist, make empty string
      profile.age = !isEmpty(profile.age) ? profile.age : ''
      profile.gender = !isEmpty(profile.gender) ? profile.gender : ''
      profile.location = !isEmpty(profile.location) ? profile.location : ''
      profile.bio = !isEmpty(profile.bio) ? profile.bio : ''
      profile.yearsPlayedMusic = !isEmpty(profile.yearsPlayedMusic) ? profile.yearsPlayedMusic : ''
      profile.gigsPlayed = !isEmpty(profile.gigsPlayed) ? profile.gigsPlayed : ''
      profile.availableToRehearse = !isEmpty(profile.availableToRehearse) ? profile.availableToRehearse : ''
      profile.availableToGig = !isEmpty(profile.availableToGig) ? profile.availableToGig : ''
      profile.recordingExperience = !isEmpty(profile.recordingExperience) ? profile.recordingExperience : false
      profile.lookingForBand = !isEmpty(profile.lookingForBand) ? profile.lookingForBand : false
      profile.lookingForBandmates = !isEmpty(profile.lookingForBandmates) ? profile.lookingForBandmates : false
      profile.instruments = !isEmpty(profile.instruments) ? profile.instruments : []
      profile.genres = !isEmpty(profile.genres) ? profile.genres : []
      profile.website = !isEmpty(profile.website) ? profile.website : ''
      profile.social = !isEmpty(profile.social) ? profile.social : {}
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : ''
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : ''
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : ''
      profile.soundcloud = !isEmpty(profile.social.soundcloud) ? profile.social.soundcloud : ''
      profile.bandcamp = !isEmpty(profile.social.bandcamp) ? profile.social.bandcamp : ''

      // Set component state
      this.setState({
        handle: profile.handle,
        age: profile.age,
        gender: profile.gender,
        location: profile.location,
        bio: profile.bio,
        yearsPlayedMusic: profile.yearsPlayedMusic,
        gigsPlayed: profile.gigsPlayed,
        availableToRehearse: profile.availableToRehearse,
        availableToGig: profile.availableToGig,
        recordingExperience: profile.recordingExperience,
        lookingForBand: profile.lookingForBand,
        lookingForBandmates: profile.lookingForBandmates,
        instruments: profile.instruments,
        genres: profile.genres,
        website: profile.website,
        facebook: profile.facebook,
        twitter: profile.twitter,
        youtube: profile.youtube,
        soundcloud: profile.soundcloud,
        bandcamp: profile.bandcamp
      })
    }
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

  handleCheckboxChange = (e) => {
    this.setState({ [e.target.name]: e.target.checked })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const profileData = {
      handle: this.state.handle,
      age: this.state.age,
      gender: this.state.gender,
      location: this.state.location,
      bio: this.state.bio,
      yearsPlayedMusic: this.state.yearsPlayedMusic,
      gigsPlayed: this.state.gigsPlayed,
      availableToRehearse: this.state.availableToRehearse,
      availableToGig: this.state.availableToGig,
      recordingExperience: this.state.recordingExperience,
      lookingForBand: this.state.lookingForBand,
      lookingForBandmates: this.state.lookingForBandmates,
      instruments: this.state.instruments,
      genres: this.state.genres,
      website: this.state.website,
      facebook: this.state.facebook,
      twitter: this.state.twitter,
      youtube: this.state.youtube,
      soundcloud: this.state.soundcloud,
      bandcamp: this.state.bandcamp
    }
    this.props.createProfile(profileData, this.props.history)
  }

  toggleSocialInputs = () => {
    this.setState(prevState => ({ displaySocialInputs: !prevState.displaySocialInputs }))
  }

  renderSocialInputs = () => {
    const { errors } = this.state

    return (
      <React.Fragment>
        <div>
          <label>Website</label>
          <input
            onChange={this.handleChange}
            type="text"
            value={this.state.website}
            name="website"
            autoComplete="off"
            className={"social-input-website " + ( errors.website ? "input-error" : "" ) }
          />
          { errors.website && <small className="input-error-message">{ errors.website }</small> }
        </div>
        <div>
          <label>Facebook</label>
          <input
            onChange={this.handleChange}
            type="text"
            value={this.state.facebook}
            name="facebook"
            autoComplete="off"
            className={"social-input-facebook " + ( errors.facebook ? "input-error" : "" ) }
          />
          { errors.facebook && <small className="input-error-message">{ errors.facebook }</small> }
        </div>
        <div>
          <label>Twitter</label>
          <input
            onChange={this.handleChange}
            type="text"
            value={this.state.twitter}
            name="twitter"
            autoComplete="off"
            className={"social-input-twitter " + ( errors.twitter ? "input-error" : "" ) }
          />
          { errors.twitter && <small className="input-error-message">{ errors.twitter }</small> }
        </div>
        <div>
          <label>YouTube</label>
          <input
            onChange={this.handleChange}
            type="text"
            value={this.state.youtube}
            name="youtube"
            autoComplete="off"
            className={"social-input-youtube " + ( errors.youtube ? "input-error" : "" ) }
          />
          { errors.youtube && <small className="input-error-message">{ errors.youtube }</small> }
        </div>
        <div>
          <label>SoundCloud</label>
          <input
            onChange={this.handleChange}
            type="text"
            value={this.state.soundcloud}
            name="soundcloud"
            autoComplete="off"
            className={"social-input-soundcloud " + ( errors.soundcloud ? "input-error" : "" ) }
          />
          { errors.soundcloud && <small className="input-error-message">{ errors.soundcloud }</small> }
        </div>
        <div>
          <label>Bandcamp</label>
          <input
            onChange={this.handleChange}
            type="text"
            value={this.state.bandcamp}
            name="bandcamp"
            autoComplete="off"
            className={"social-input-bandcamp " + ( errors.bandcamp ? "input-error" : "" ) }
          />
          { errors.bandcamp && <small className="input-error-message">{ errors.bandcamp }</small> }
        </div>
      </React.Fragment>
    )
  }

  render() {
    const { errors, displaySocialInputs } = this.state

    return (
      <div className="create-profile-container max-width-form">
        <div className="form-container">
          <div className="form-inner">
            <form id="create-profile-form" action="" onSubmit={this.handleSubmit} noValidate>
              <h1 className="form-header">Edit your profile</h1>
              <small>* = required fields</small>
              <div className="form-body">
                <div>
                  <label>Handle *</label>
                  <input
                    disabled
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.handle}
                    name="handle"
                    autoComplete="off"
                    className={ errors.handle && "input-error" }
                  />
                  { errors.handle && <small className="input-error-message">{ errors.handle }</small> }
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
                <div>
                  <label>Years Played Music</label>
                  <select className="form-select" value={this.state.yearsPlayedMusic} onChange={this.handleChange} name="yearsPlayedMusic">
                    <option value=""></option>
                    <option value="1 Year">1 Year</option>
                    <option value="1-5 Years">1-5 Years</option>
                    <option value="5-10 Years">5-10 Years</option>
                    <option value="10+ Years">10+ Years</option>
                  </select>
                </div>
                <div>
                  <label>Gigs played</label>
                  <select className="form-select" value={this.state.gigsPlayed} onChange={this.handleChange} name="gigsPlayed">
                    <option value=""></option>
                    <option value="None">None</option>
                    <option value="1-100">1-100</option>
                    <option value="100+">100+</option>
                  </select>
                </div>
                <div>
                  <label>Available To Rehearse</label>
                  <select className="form-select" value={this.state.availableToRehearse} onChange={this.handleChange} name="availableToRehearse">
                    <option value=""></option>
                    <option value="Once a week">Once a week</option>
                    <option value="Twice a week">Twice a week</option>
                    <option value="3 times a week">3 times a week</option>
                    <option value="4 times a week">4 times a week</option>
                    <option value="5 times a week">5 times a week</option>
                    <option value="6 times a week">6 times a week</option>
                    <option value="7 times a week">7 times a week</option>
                  </select>
                </div>
                <div>
                  <label>Available To Gig</label>
                  <select className="form-select" value={this.state.availableToGig} onChange={this.handleChange} name="availableToGig">
                    <option value=""></option>
                    <option value="Once a week">Once a week</option>
                    <option value="Twice a week">Twice a week</option>
                    <option value="3 times a week">3 times a week</option>
                    <option value="4 times a week">4 times a week</option>
                    <option value="5 times a week">5 times a week</option>
                    <option value="6 times a week">6 times a week</option>
                    <option value="7 times a week">7 times a week</option>
                  </select>
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
                <div className="grid-full-width">
                  <label>Bio</label>
                  <textarea
                    onChange={this.handleChange}
                    value={this.state.bio}
                    name="bio"
                  />
                </div>
                <div className="grid-full-width">
                  <input
                    onChange={this.handleCheckboxChange}
                    type="checkbox"
                    checked={this.state.recordingExperience}
                    name="recordingExperience"
                    className="checkbox"
                  />
                  <label className="checkbox-label">Recording Experience</label>
                </div>
                <div className="grid-full-width">
                  <input
                    onChange={this.handleCheckboxChange}
                    type="checkbox"
                    checked={this.state.lookingForBand}
                    name="lookingForBand"
                    className="checkbox"
                  />
                  <label className="checkbox-label">Looking For Band</label>
                </div>
                <div className="grid-full-width">
                  <input
                    onChange={this.handleCheckboxChange}
                    type="checkbox"
                    checked={this.state.lookingForBandmates}
                    name="lookingForBandmates"
                    className="checkbox"
                  />
                  <label className="checkbox-label">Looking For Bandmates</label>
                </div>
                <div className="grid-full-width">
                  <button type="button" className="button button-blue" onClick={this.toggleSocialInputs}>Edit social links</button>
                </div>
                { displaySocialInputs && this.renderSocialInputs() }
              </div>
              <button className="button button-darkblue" type="submit">Confirm</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))

