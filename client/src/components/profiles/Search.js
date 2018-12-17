import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { filterProfiles } from '../../actions/profileActions'


class Search extends Component {
  render() {
    return (
      <div className="search-container">
        <label>Search</label>
        <input type="text" onChange={(e) => {this.props.filterProfiles(e.target.value)}} />
      </div>
    )
  }
}

Search.propTypes = {
  filterProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

export default connect(mapStateToProps, { filterProfiles })(Search)
