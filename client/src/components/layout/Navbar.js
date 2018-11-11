import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'
import '../../styles/global/hamburgers.min.css'
import '../../styles/global/styles.css'
import '../../styles/components/Navbar.css'
import '../../styles/components/MobileNav.css'

class Navbar extends Component {
  state = {
    mobileMenuActive: false,
    windowWidth: window.innerWidth
  }

  toggleMobileMenu = () => {
    if (this.state.windowWidth <= 768) {
      this.setState(prevState => ({ mobileMenuActive: !prevState.mobileMenuActive }))
    }
  }

  updateWindowWidth = () => {
    this.setState({ windowWidth: window.innerWidth })
    if (this.state.windowWidth >= 768) {
      this.setState({ mobileMenuActive: false })
    }
  }

  handleLogout = (e) => {
    e.preventDefault()
    this.props.clearCurrentProfile()
    this.props.logoutUser(this.props.history)
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowWidth)
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <ul className="main-nav">
        <li>
          <Link to="/profiles" onClick={this.toggleMobileMenu}>View Musicians</Link>
        </li>
        <li>
          <Link to="/dashboard" className="button button-blue" onClick={this.toggleMobileMenu}>Dashboard</Link>
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
          <Link to="/profiles" onClick={this.toggleMobileMenu}>View Musicians</Link>
        </li>
        <li>
          <Link to="/login" className="button button-blue" onClick={this.toggleMobileMenu}>Login</Link>
        </li>
        <li>
          <Link to="/register" className="button button-white" onClick={this.toggleMobileMenu}>Sign Up</Link>
        </li>
      </ul>
    )

    return (
      <div className={"navbar-container " + (this.props.location.pathname !== '/' ? "nav-dark-bg" : "")}>
        <div className={"mobile-nav-container " + (this.state.mobileMenuActive && this.state.windowWidth <= 768 ? "open" : "")}>
          <nav className="mobile-nav-inner">
            { isAuthenticated ? authLinks : guestLinks }
          </nav>
        </div>
        <header className="max-width">
          <div className="logo">
            <Link to="/" onClick={this.state.mobileMenuActive && this.toggleMobileMenu}>
              <span className="logo-blue">M</span><span>usician</span><span className="logo-blue">H</span><span>ub</span>
            </Link>
          </div>
          <button
            className={"hamburger hamburger--vortex " + (this.state.mobileMenuActive && this.state.windowWidth <= 768 ? "is-active" : "")}
            type="button"
            onClick={this.toggleMobileMenu}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
          <nav className="desktop-nav">
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
