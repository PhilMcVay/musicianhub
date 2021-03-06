import React, { Component } from 'react'
import PostItem from './PostItem'

class Posts extends Component {
  render() {
    const { posts } = this.props

    return (
      <div className="feed">
        {
          posts.length
            ? posts.map(post => <PostItem key={post._id} post={post}/>)
            : <p className="italic">No posts</p>
        }
      </div>
    )
  }
}

export default Posts

