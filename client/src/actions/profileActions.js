import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES,
  GET_ERRORS,
  SET_CURRENT_USER,
  FILTER_PROFILES
} from './types'
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

// Get profile by handle
export function getProfileByHandle(handle) {
  const loadingDelay = delay => new Promise(resolve => { setTimeout(resolve, delay) });

  return async (dispatch) => {
    dispatch(setProfileLoading())
    // Fake loading for 0.7 seconds before axios call
    await loadingDelay(700)
    await axios
      .get(`/api/profile/handle/${handle}`)
      .then(res => {
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })
      })
      .catch(() => {
        dispatch({
          type: GET_PROFILE,
          payload: null
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

// Get profiles
export function getProfiles() {
  const loadingDelay = delay => new Promise(resolve => { setTimeout(resolve, delay) });

  return async (dispatch) => {
    dispatch(setProfileLoading())
    // Fake loading for 0.7 seconds before axios call
    await loadingDelay(700)
    await axios
      .get('/api/profile/all')
      .then(res => {
        dispatch({
          type: GET_PROFILES,
          payload: res.data
        })
      })
      .catch(() => {
        dispatch({
          type: GET_PROFILES,
          payload: null
        })
      })
  }
}

// Filter Profiles
export const filterProfiles = (input) => dispatch => {
  dispatch({
    type: FILTER_PROFILES,
    payload: input
  })
}

// Delete Account
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure you want to delete your account?')) {
    axios
      .delete('/api/profile')
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      })
      .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        })
      })
  }
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
