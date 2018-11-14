import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import '../../styles/components/PostItem.css'

class PostItem extends Component {
  handleDeletePost = (id) => {
    console.log(id)
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
            <button type="button">
              <i class="far fa-thumbs-up"><span className="like-counter">{likes.length}</span></i>
            </button>
            <button type="button">
              <i class="far fa-thumbs-down"></i>
            </button>
            {
              this.props.post.user === auth.user.id &&
              <button type="button" className="delete-post-button" onClick={this.handleDeletePost(_id)}>
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
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(PostItem)
