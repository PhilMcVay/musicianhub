import React, { Component } from 'react'
import '../../styles/components/ProfileHeader.css'

class ProfileHeader extends Component {
  renderSocial = (profile) => {
    return (
      <React.Fragment>
        { profile.social.facebook &&
          <a
            href={profile.social.facebook}
            target="_blank">
            <i class="fab fa-facebook-f"></i>
          </a>
        }
        { profile.social.twitter &&
          <a
            href={profile.social.twitter}
            target="_blank">
            <i class="fab fa-twitter"></i>
          </a>
        }
        { profile.social.youtube &&
          <a
            href={profile.social.youtube}
            target="_blank">
            <i class="fab fa-youtube"></i>
          </a>
        }
        { profile.social.bandcamp &&
          <a
            href={profile.social.bandcamp}
            target="_blank">
            <i class="fab fa-bandcamp"></i>
          </a>
        }
        { profile.social.soundcloud &&
          <a
            href={profile.social.soundcloud}
            target="_blank">
            <i class="fab fa-soundcloud"></i>
          </a>
        }
      </React.Fragment>
    )
  }

  render() {
    const { profile } = this.props

    return (
      <div className="profile-header-container">
        <div className="profile-header-overlay"></div>
        <div className="profile-header-info">
          <img className="profile-image" src={profile.user.avatar} alt={profile.name}/>
          <div className="profile-title">
            <h1>{profile.user.name}</h1>
            <h2>{profile.location}</h2>
          </div>
          <div className="profile-social">
            { profile.website &&
              <a
                href={profile.website}
                target="_blank">
                <i class="fas fa-globe"></i>
              </a>
            }
            { profile.social && this.renderSocial(profile) }
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileHeader
