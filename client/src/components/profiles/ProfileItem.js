import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ProfileItem extends Component {
  state = {
    showInstruments: false,
    showGenres: false
  }

  toggleInstruments = () => {
    if (this.state.showGenres) {
      this.setState(prevState => ({
        showInstruments: !prevState.showInstruments,
        showGenres: false
      }))
    } else {
      this.setState(prevState => ({ showInstruments: !prevState.showInstruments }))
    }
  }

  toggleGenres = () => {
    if (this.state.showInstruments) {
      this.setState(prevState => ({
        showGenres: !prevState.showGenres,
        showInstruments: false
      }))
    } else {
      this.setState(prevState => ({ showGenres: !prevState.showGenres }))
    }
  }

  renderDropdown = (items) => {
    return (
      <div className="profile-item-dropdown">
        { items.map(item => <span>{ item }</span>) }
      </div>
    )
  }

  render() {
    const { profile } = this.props
    const { showInstruments, showGenres } = this.state

    return (
      <div className="profile-item-container">
        <Link to={`profile/${profile.handle}`}>
          <div className="profile-item-image">
            <img className="profile-item-image" src={profile.user.avatar} alt={profile.handle}/>
              <div className="profile-item-overlay"></div>
              <div className="profile-item-info">
                <h4>{profile.user.name}</h4>
                <h5>{profile.location}</h5>
            </div>
          </div>
        </Link>
        <div className="profile-item-buttons">
          { profile.instruments.length > 0 &&
            <button
              type="button"
              name="instruments"
              onClick={this.toggleInstruments}
              className="profile-button">
              Instruments
            </button>
          }
          { showInstruments && this.renderDropdown(profile.instruments) }
          { profile.genres.length > 0 &&
            <button
              type="button"
              name="genres"
              onClick={this.toggleGenres}
              className="profile-button">
              Genres
            </button>
          }
          { showGenres && this.renderDropdown(profile.genres) }
        </div>
      </div>
    )
  }
}

export default ProfileItem