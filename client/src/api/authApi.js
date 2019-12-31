import axios from 'axios';
import { configureHttpHeaders } from './apiHelpers';

const baseUrl = '/api';
const CancelToken = axios.CancelToken;
let source;

export const loadValidUser = () => {
  configureHttpHeaders(axios);

  if (source !== undefined && source !== '') {
    source.cancel('Operation canceled by the user.');
  }
  // regenerate cancelToken
  source = CancelToken.source();
  return get('/auth', source.token);
}

export const registerUser = (payload) => {
  configureHttpHeaders(axios);

  return post('/users', payload);
}

export const loginUser = (payload) => {
  configureHttpHeaders(axios);
  return post('/auth', payload);
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

async function post(url, profile) {
  try {
    const response = await axios.post(`${baseUrl}${url}`, profile)
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
  loadValidUser,
  registerUser,
  loginUser
}