import axios from 'axios';
import { configureHttpHeaders } from './apiHelpers';

const baseUrl = '/api/profile';
const CancelToken = axios.CancelToken;
let source;

export const getCurrent = () => {
  configureHttpHeaders(axios);
  if (source !== undefined && source !== '') {
    source.cancel('Operation canceled by the user.');
  }
  // regenerate cancelToken
  source = CancelToken.source();
  return get('/me', source.token);
}

export const getAllProfiles = () => {
  configureHttpHeaders(axios);
  if (source !== undefined && source !== '') {
    source.cancel('Operation canceled by the user.');
  }
  // regenerate cancelToken
  source = CancelToken.source();
  return get('', source.token);
};

export const getById = (id) => {
  configureHttpHeaders(axios);
  if (source !== undefined && source !== '') {
    source.cancel('Operation canceled by the user.');
  }
  // regenerate cancelToken
  source = CancelToken.source();
  return get(`/user/${id}`, source.token);
}

export const addExperienceItem = (payload) => {
  configureHttpHeaders(axios);
  return put('/experience', payload);
}

export const addEducationItem = (payload) => {
  configureHttpHeaders(axios);
  return put('/education', payload);
}

export const deleteExperienceItem = (id) => {
  configureHttpHeaders(axios);
  return remove('/experience', id);
}

export const deleteEducationItem = (id) => {
  configureHttpHeaders(axios);
  return remove('/education', id);
}

export const fetchGithubRepos = (username) => {
  configureHttpHeaders(axios);
  if (source !== undefined && source !== '') {
    source.cancel('Operation canceled by the user.');
  }
  // regenerate cancelToken
  source = CancelToken.source();
  return get(`/github/${username}`, source.token);
}

export const createAndUpdateProfile = (payload) => {
  return post('', payload);
}

async function get(url, source = '') {
  try {
    const response = await axios.get(`${baseUrl}${url}`, {
      cancelToken: source.token,
    });
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}

async function put(url, profile) {
  try {
    const response = await axios.put(`${baseUrl}${url}`, profile);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}

async function post(url, profile) {
  try {
    const response = await axios.post(`${baseUrl}${url}`, profile)
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}

async function remove(url, id) {
  try {
    const response = await axios.delete(`${baseUrl}${url}/${id}`);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
}
function onSuccess(response) {
  let result;

  if (response.status !== 204) {
    result = response;
  } else {
    result = 'Success';
  }
  return result;
}

function onError(error) {
  const returnedError = error;
  throw returnedError;
}

export default {
  getCurrent,
  getAllProfiles,
  getById,
  fetchGithubRepos,
  createAndUpdateProfile,
  addExperienceItem,
  addEducationItem,
  deleteExperienceItem,
  deleteEducationItem
};