import React from 'react'
import spinner from '../../images/spinner.gif'
import '../../styles/global/styles.css'
import '../../styles/components/Dashboard.css'

const Spinner = () => {
  return (
    <div className="spinner-container">
      <img className="spinner" src={spinner} alt="Loading"/>
    </div>
  )
}

export default Spinner
