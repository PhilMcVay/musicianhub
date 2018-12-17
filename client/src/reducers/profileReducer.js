import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, FILTER_PROFILES } from '../actions/types'

const initialState = {
  profile: null,
  profiles: null,
  filteredProfiles: null,
  isLoading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        filteredProfiles: action.payload,
        isLoading: false
      }
    case FILTER_PROFILES:
      const input = action.payload.toLowerCase().trim()
      const filteredProfiles = state.profiles.filter(profile => {
        // Filters by name, location, instruments and genres
        return profile.user.name.toLowerCase().includes(input) ||
               profile.location.toLowerCase().includes(input) ||
               profile.instruments.some(instrument => instrument.toLowerCase().includes(input)) ||
               profile.genres.some(genre => genre.toLowerCase().includes(input))
      })
      return {
        ...state,
        filteredProfiles
      }
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      }
    default:
      return state
  }
}