import {
  getCurrent,
  getAllProfiles,
  getById,
  fetchGithubRepos,
  createAndUpdateProfile
} from '../../api/profileApi';

import {
  loadValidUser,
  registerUser,
  loginUser
} from '../../api/authApi';
const useApi = (apiName) => {
  switch (apiName) {
    case 'Profile':
      return {
        getCurrent,
        getAllProfiles,
        getById,
        fetchGithubRepos,
        createAndUpdateProfile
      };
    case 'Auth':
      return {
        loadValidUser,
        registerUser,
        loginUser
      };
    default:
      return {};
  }
};

export default useApi;
