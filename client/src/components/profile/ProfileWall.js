import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Posts from '../posts/Posts'
import PostForm from '../posts/PostForm'

class ProfileWall extends Component {
  render() {
    const { isAuthenticated } = this.props.auth

    return (
      <div className="profile-wall-container">
        <Posts />
        { isAuthenticated && <PostForm /> }
      </div>
    )
  }
}

ProfileWall.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(ProfileWall)