import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import Spinner from './Spinner'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  renderDashboard = (profile) => {
    const { user } = this.props.auth
    const firstName = user.name.split(' ')[0]

    if (Object.keys(profile).length > 0) {
      return (
        <React.Fragment>
          <h1 className="dashboard-header">Hi {firstName}!</h1>
          <Link to={`/profile/${profile.handle}`} className="button button-blue inline-block">View Profile</Link>
          <Link to="/edit-profile" className="button button-blue inline-block">Edit Profile</Link>
          <a href="#" onClick={this.handleDeleteAccount} className="button button-red inline-block">Delete Account</a>
        </React.Fragment>
      )
    } else {
      // User is logged in but has not created a profile
      return (
        <React.Fragment>
          <h1 className="dashboard-header">Welcome {firstName}!</h1>
          <Link to="/create-profile" className="button button-blue inline-block">Create your Profile</Link>
        </React.Fragment>
      )
    }
  }

  handleDeleteAccount = () => {
    this.props.deleteAccount()
  }

  render() {
    const { profile, isLoading } = this.props.profile

    return (
      <div className="dashboard-container">
        { profile === null || isLoading ? <Spinner /> : this.renderDashboard(profile) }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
})

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
