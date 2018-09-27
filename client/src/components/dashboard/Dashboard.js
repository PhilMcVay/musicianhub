import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentProfile } from '../../actions/profileActions'
import Spinner from './Spinner'

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile()
  }

  renderDashboard = () => {
    const { user } = this.props.auth
    const { profile, isLoading } = this.props.profile
    const firstName = user.name.split(' ')[0]

    if (profile === null || isLoading) {
      return <Spinner />
    } else {
      if (Object.keys(profile).length > 0) {
        return <h4>TODO: DISPLAY PROFILE</h4>
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
  }

  render() {
    return (
      <div className="dashboard-container">
        { this.renderDashboard() }
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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
