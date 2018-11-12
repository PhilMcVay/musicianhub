import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import ProfileWall from './ProfileWall'
import '../../styles/components/ProfileAbout.css'

class ProfileAbout extends Component {
  renderInstruments = (instruments) => {
    return (
      <ul>
        { instruments.map((instrument, index) => <li key={`genre ${index + 1}`}>{instrument}</li>) }
      </ul>
    )
  }

  renderGenres = (genres) => {
    return (
      <ul>
        { genres.map((genre, index) => <li key={`genre ${index + 1}`}>{genre}</li>) }
      </ul>
    )
  }

  render() {
    const { profile } = this.props

    return (
      <div className="profile-about-container">
        <Tabs>
          <TabList>
            <Tab>About</Tab>
            <Tab>Wall</Tab>
          </TabList>

          <TabPanel className="profile-about-panel">
            <section>
              <h3>Age</h3>
              { profile.age ? <p>{profile.age}</p> : <p className="italic">No info</p> }
            </section>
            <section>
              <h3>Gender</h3>
              { profile.gender ? <p>{profile.gender}</p> : <p className="italic">No info</p> }
            </section>
            <section>
              <h3>Instruments</h3>
              { profile.instruments.length ? this.renderInstruments(profile.instruments) : <p className="italic">No info</p> }
            </section>
            <section>
              <h3>Genres</h3>
              { profile.genres.length ? this.renderGenres(profile.genres) : <p className="italic">No info</p> }
            </section>
            <section>
              <h3>Years of Playing Music</h3>
              { profile.yearsPlayedMusic ? <p>{profile.yearsPlayedMusic}</p> : <p className="italic">No info</p> }
            </section>
            <section>
              <h3>Gigs Played</h3>
              { profile.gigsPlayed ? <p>{profile.gigsPlayed}</p> : <p className="italic">No info</p> }
            </section>
            <section>
              <h3>Available to Gig</h3>
              { profile.availableToGig ? <p>{profile.availableToGig}</p> : <p className="italic">No info</p> }
            </section>
            <section>
              <h3>Available to Rehearse</h3>
              { profile.availableToRehearse ? <p>{profile.availableToRehearse}</p> : <p className="italic">No info</p> }
            </section>
            <section>
              <h3>Looking For Band</h3>
              { profile.lookingForBand
                ? <img src={require("../../images/success.svg")} alt="True"/>
                : <img src={require("../../images/error.svg")} alt="False"/>
              }
            </section>
            <section>
              <h3>Looking For Band Mates</h3>
              { profile.lookingForBandmates
                ? <img src={require("../../images/success.svg")} alt="True"/>
                : <img src={require("../../images/error.svg")} alt="False"/>
              }
            </section>
            <section>
              <h3>Recording Experience</h3>
              { profile.recordingExperience
                ? <img src={require("../../images/success.svg")} alt="True"/>
                : <img src={require("../../images/error.svg")} alt="False"/>
              }
            </section>
          </TabPanel>
          <TabPanel>
            <ProfileWall />
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

export default ProfileAbout