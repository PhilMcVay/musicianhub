import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../actions/postActions'
import '../../styles/components/PostForm.css'

class PostForm extends Component {
  state = {
    text: '',
    errors: {}
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { user } = this.props.auth

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
      relatedHandle: this.props.handle
    }

    this.props.addPost(newPost)

    this.setState({ text: '' })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  render() {
    const { errors } = this.state

    return (
      <div className="post-form-container">
        <form id="post-form" onSubmit={this.handleSubmit} noValidate>
          <label>Add a post</label>
          <textarea
            onChange={this.handleChange}
            value={this.state.text}
            name="text"
            className={ errors.text && "input-error" }
          />
          { errors.text && <small className="input-error-message">{ errors.text }</small> }
          <button className="button button-darkblue" type="submit">Post</button>
        </form>
      </div>
    )
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
})

export default connect(mapStateToProps, { addPost })(PostForm)
