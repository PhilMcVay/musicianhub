import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './types'
import axios from 'axios'

// Get current profile
export function getCurrentProfile() {
  const loadingDelay = delay => new Promise(resolve => { setTimeout(resolve, delay) });

  return async (dispatch) => {
    dispatch(setProfileLoading())
    // Fake loading for 0.7 seconds before axios call
    await loadingDelay(700)
    await axios
      .get('/api/profile')
      .then(res => {
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      })
      .catch(() => {
        dispatch({
          type: GET_PROFILE,
          payload: {}
        })
      })
  }
}

// Create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    })
}

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}
