import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../dashboard/Spinner'
import Search from './Search'
import ProfileItem from './ProfileItem'
import { getProfiles } from '../../actions/profileActions'
import '../../styles/components/Profile.css'


class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles()
  }

  renderProfiles = (profiles) => {
    if (profiles.length > 0) {
      return (
        <React.Fragment>
          <div className="profiles-grid">
            { profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />) }
          </div>
        </React.Fragment>
      )
    } else {
      return <h1 className="profiles-header">No profiles were found...</h1>
    }
  }

  render() {
    const { filteredProfiles, isLoading } = this.props.profile

    return (
      <div className="profiles-container max-width-profile">
        <h1 className="profiles-header">Musicians</h1>
        <Search />
        { filteredProfiles === null || isLoading ? <Spinner /> : this.renderProfiles(filteredProfiles) }
      </div>
    )
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
