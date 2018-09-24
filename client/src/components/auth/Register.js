import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import '../../styles/components/Form.css'

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {}
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }
    this.props.registerUser(newUser, this.props.history)
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  render() {
    const { errors } = this.state

    return (
      <div className="register-container max-width-form">
        <div className="form-container">
          <div className="form-inner">
            <form id="register-form" action="" onSubmit={this.handleSubmit} noValidate>
              <h1 className="form-header">Create an Account</h1>
              <div className="form-body">
                <div>
                  <label>Name</label>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    value={this.state.name}
                    name="name"
                    autoComplete="off"
                    className={ errors.name && "input-error" }
                  />
                  { errors.name && <small className="input-error-message">{ errors.name }</small> }
                </div>
                <div>
                  <label>Email</label>
                  <input
                    onChange={this.handleChange}
                    type="email"
                    value={this.state.email}
                    name="email"
                    autoComplete="off"
                    className={ errors.email && "input-error" }
                  />
                  { errors.email && <small className="input-error-message">{ errors.email }</small> }
                  <small>Please use <a href="https://en.gravatar.com/" target="_blank" rel="noopener noreferrer" tabIndex="-1">Gravatar</a> email for profile image</small>
                </div>
                <div>
                  <label>Password</label>
                  <input
                    onChange={this.handleChange}
                    type="password"
                    value={this.state.password}
                    name="password"
                    autoComplete="off"
                    className={ errors.password && "input-error" }
                  />
                  { errors.password && <small className="input-error-message">{ errors.password }</small> }
                </div>
                <div>
                  <label>Confirm Password</label>
                  <input
                    onChange={this.handleChange}
                    type="password"
                    value={this.state.confirmPassword}
                    name="confirmPassword"
                    autoComplete="off"
                    className={ errors.confirmPassword && "input-error" }
                  />
                  { errors.confirmPassword && <small className="input-error-message">{ errors.confirmPassword }</small> }
                </div>
              </div>
              <button className="button button-darkblue" type="submit">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))