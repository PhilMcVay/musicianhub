import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deletePost, addLike, removeLike } from '../../actions/postActions'
import moment from 'moment'
import '../../styles/components/PostItem.css'

class PostItem extends Component {
  handleDeletePost = (id) => {
    this.props.deletePost(id)
  }

  handleAddLike = (id) => {
    this.props.addLike(id)
  }

  handleRemoveLike = (id) => {
    this.props.removeLike(id)
  }

  render() {
    const { auth } = this.props
    const { text, avatar, name, date, likes, _id } = this.props.post
    return (
      <div className="postitem-container">
        <img className="post-avatar" src={avatar}/>
        <div className="post-content">
          <h3>{name}</h3>
          <p className="post-time">{moment(date).startOf('minute').fromNow()}</p>
          <p>{text}</p>
          <div className="postactions-container">
            <button type="button" onClick={() => { this.handleAddLike(_id) }}>
              <i class="far fa-thumbs-up"><span className="like-counter">{likes.length}</span></i>
            </button>
            <button type="button" onClick={() => { this.handleRemoveLike(_id) }}>
              <i class="far fa-thumbs-down"></i>
            </button>
            {
              this.props.post.user === auth.user.id &&
              <button type="button" className="delete-post-button" onClick={() => { this.handleDeletePost(_id) }}>
                <i class="fas fa-times"></i>
              </button>
            }
          </div>
        </div>
      </div>
    )
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem)
