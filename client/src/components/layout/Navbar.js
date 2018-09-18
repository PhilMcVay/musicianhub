import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../../styles/global/styles.css'
import '../../styles/components/Navbar.css'

class Navbar extends Component {
  render() {
    return (
      <div className={"navbar-container " + (this.props.location.pathname !== '/' && "nav-dark-bg")}>
        <header className="max-width">
          <div className="logo">
            <Link to="/">
              <span className="logo-blue">M</span><span>usician</span><span className="logo-blue">H</span><span>ub</span>
            </Link>
          </div>
          <nav>
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
          </nav>
        </header>
      </div>
    )
  }
}

export default withRouter(Navbar)
