export default {
  alerts: [],
  auth: {
    isAuthenticated: null,
    loading: true,
    user: null,
    token: localStorage.getItem('token'),
  },
  profile: {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
  }


}