import React, { Component } from 'react'
import '../../styles/components/ProfileBio.css'

class ProfileBio extends Component {
  render() {
    const { profile } = this.props

    return (
      <div className="profile-bio-container">
        <h2>Bio</h2>
        { profile.bio ? <p>{profile.bio}</p> : <p>No bio information</p> }
      </div>
    )
  }
}

export default ProfileBio