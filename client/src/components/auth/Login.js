import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'

import '../../styles/components/Form.css'

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData)
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  render() {
    const { errors } = this.state

    return (
      <div className="login-container max-width-form">
        <div className="form-container">
          <div className="form-inner">
            <form id="login-form" action="" onSubmit={this.handleSubmit} noValidate>
              <h1 className="form-header">Login</h1>
              <div className="form-body">
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
              </div>
              <button className="button button-darkblue" type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)
