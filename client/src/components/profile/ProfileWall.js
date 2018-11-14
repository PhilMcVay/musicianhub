import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Posts from '../posts/Posts'
import PostForm from '../posts/PostForm'

class ProfileWall extends Component {
  render() {
    const { isAuthenticated } = this.props.auth
    const { handle } = this.props.profile
    const { posts } = this.props.post

    const filteredPosts = posts !== null
      ? posts.filter(post => post.relatedHandle === handle)
      : []

    return (
      <div className="profile-wall-container">
        <Posts posts={filteredPosts}/>
        { isAuthenticated && <PostForm handle={handle} /> }
      </div>
    )
  }
}

ProfileWall.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
})

export default connect(mapStateToProps)(ProfileWall)