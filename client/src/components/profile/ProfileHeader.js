import React, { Component } from 'react'
import '../../styles/components/ProfileHeader.css'

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props

    return (
      <div className="profile-header-container">
        <div className="profile-header-overlay"></div>
        <div className="profile-header-info">
          <img className="profile-image" src={profile.user.avatar} alt={profile.name}/>
          <h1>{profile.user.name}</h1>
          <h2>{profile.location}</h2>
        </div>
      </div>
    )
  }
}

export default ProfileHeader
