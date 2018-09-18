import React, { Component } from 'react'
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
    console.log(newUser)
  }

  render() {
    return (
      <div className="register-container max-width-form">
        <div className="form-container">
          <div className="form-inner">
            <form id="register-form" action="" onSubmit={this.handleSubmit}>
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
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    onChange={this.handleChange}
                    type="email"
                    value={this.state.email}
                    name="email"
                    autoComplete="off"
                  />
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
                  />
                </div>
                <div>
                  <label>Confirm Password</label>
                  <input
                    onChange={this.handleChange}
                    type="password"
                    value={this.state.confirmPassword}
                    name="confirmPassword"
                    autoComplete="off"
                  />
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

export default Register