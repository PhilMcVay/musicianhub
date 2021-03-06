import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { setAuthToken } from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions'
import { Provider } from 'react-redux'
import store from './store'
import PrivateRoute from './components/PrivateRoute'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'

// Check for token
if (localStorage.jwtToken) {
  // set Auth token to header Auth
  setAuthToken(localStorage.jwtToken)
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))
  // Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Logout the user
    store.dispatch(logoutUser())
    // Clear the current profile
    store.dispatch(clearCurrentProfile())
    // Redirect to login
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <ScrollToTop>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={ Landing } />
              <div className="max-width">
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } />
                <Route exact path="/profiles" component={ Profiles } />
                <Route path="/profile/:handle" component={ Profile } />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={ Dashboard } />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
                </Switch>
              </div>
            </div>
          </ScrollToTop>
        </Router>
      </Provider>
    )
  }
}

export default App