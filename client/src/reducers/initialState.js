export default {
  alerts: [],
  auth: {
    isAuthenticated: null,
    loading: true,
    user: {
      admin: false
    },
    token: localStorage.getItem('token'),
  },
  profile: {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    loadingGit: true,
    error: {}
  },
  post: {
    posts: [],
    post: null,
    loading: true,
    error: {}
  }
}