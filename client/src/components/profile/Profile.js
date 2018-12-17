import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ProfileHeader from './ProfileHeader'
import ProfileBio from './ProfileBio'
import ProfileAbout from './ProfileAbout'
import Spinner from '../dashboard/Spinner'
import { getProfileByHandle } from '../../actions/profileActions'
import { getPosts } from '../../actions/postActions'

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle)
    }
    this.props.getPosts()
  }

  renderProfile = (profile) => {
    if (profile) {
      return (
        <React.Fragment>
          <Link className="back-cta" to="/profiles">
            <img src={require('../../images/left-arrow.svg')} alt="Back Arrow"/>
            Back to Musicians
          </Link>
          <ProfileHeader profile={profile} />
          <div className="profile-info-container">
            <ProfileBio profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </React.Fragment>
      )
    } else {
      return <h1 className="profile-header">No profile found...</h1>
    }
  }

  render() {
    const { profile, isLoading } = this.props.profile

    return (
      <div className="profile-container max-width-profile">
        { isLoading ? <Spinner /> : this.renderProfile(profile) }
      </div>
    )
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  post: state.post
})

export default connect(mapStateToProps, { getProfileByHandle, getPosts })(Profile)
