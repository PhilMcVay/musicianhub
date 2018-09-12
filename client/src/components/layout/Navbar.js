import React, { Component } from 'react'
import '../../styles/global/styles.css'
import '../../styles/components/Navbar.css'

class Navbar extends Component  {
  render() {
    return (
      <div className="navbar-container max-width">
        <header>
          <div className="logo">
            <a href="#">
              <span className="logo-blue">M</span><span>usician</span><span className="logo-blue">H</span><span>ub</span>
            </a>
          </div>
          <nav>
            <ul className="main-nav">
              <li>
                <a href="#">View Musicians</a>
              </li>
              <li>
                <a href="#" className="button button-blue">Login</a>
              </li>
              <li>
                <a href="#" className="button button-white">Sign Up</a>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    )
  }
}

export default Navbar
