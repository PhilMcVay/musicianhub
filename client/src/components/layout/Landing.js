import React, { Component } from 'react'
import '../../styles/global/styles.css'
import '../../styles/components/Landing.css'

class Landing extends Component  {
  render() {
    return (
      <div className="landing-container">
        <div className="landing-image-overlay"></div>
        <div className="landing-text">
          <main>
            <h1>A social network for local musicians</h1>
            <div className="tag-container">
              <div className="tag"><span className="logo-blue">C</span><span>reate</span></div>
              <div className="tag"><span className="logo-blue">C</span><span>onnect</span></div>
              <div className="tag"><span className="logo-blue">P</span><span>lay</span></div>
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default Landing