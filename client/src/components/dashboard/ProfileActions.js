import React from 'react'
import { Link } from 'react-router-dom'

const ProfileActions = () => {
  return (
    <div className="profile-actions-container">
      <Link to="/edit-profile" className="button button-blue inline-block">Edit Profile</Link>
      <a href="#" className="button button-red inline-block">Delete Account</a>
    </div>
  )
}

export default ProfileActions
