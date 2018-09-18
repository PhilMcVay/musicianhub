import React, { Component } from 'react'
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
    console.log(this.state)
  }

  render() {
    return (
      <div className="login-container max-width-form">
        <div className="form-container">
          <div className="form-inner">
            <form id="login-form" action="" onSubmit={this.handleSubmit}>
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
                  />
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
              </div>
              <button className="button button-darkblue" type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
