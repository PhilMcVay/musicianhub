import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'
import '../../styles/global/hamburgers.min.css'
import '../../styles/global/styles.css'
import '../../styles/components/Navbar.css'

class Navbar extends Component {
  state = {
    mobileMenuActive: false
  }

  toggleMobileMenu = () => {
    this.setState(prevState => ({ mobileMenuActive: !prevState.mobileMenuActive }))
  }

  handleLogout = (e) => {
    e.preventDefault()
    this.props.clearCurrentProfile()
    this.props.logoutUser(this.props.history)
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <ul className="main-nav">
        <li>
          <Link to="/profiles">View Musicians</Link>
        </li>
        <li>
          <Link to="/dashboard" className="button button-blue">Dashboard</Link>
        </li>
        <li>
          <a
            href="#"
            onClick={this.handleLogout}
            className="button button-white">
            <img className="user-avatar" src={user.avatar} alt={user.name}/>
            Logout
          </a>
        </li>
      </ul>
    )

    const guestLinks = (
      <ul className="main-nav">
        <li>
          <Link to="/profiles">View Musicians</Link>
        </li>
        <li>
          <Link to="/login" className="button button-blue">Login</Link>
        </li>
        <li>
          <Link to="/register" className="button button-white">Sign Up</Link>
        </li>
      </ul>
    )

    return (
      <div className={"navbar-container " + (this.props.location.pathname !== '/' ? "nav-dark-bg" : "")}>
        <header className="max-width">
          <div className="logo">
            <Link to="/">
              <span className="logo-blue">M</span><span>usician</span><span className="logo-blue">H</span><span>ub</span>
            </Link>
          </div>
          <button
            className={"hamburger hamburger--vortex " + (this.state.mobileMenuActive ? "is-active" : "")}
            type="button"
            onClick={this.toggleMobileMenu}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
          <nav>
            { isAuthenticated ? authLinks : guestLinks }
          </nav>
        </header>
      </div>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default withRouter(connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar))
