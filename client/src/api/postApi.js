import axios from 'axios';
import { configureHttpHeaders } from './apiHelpers';

const baseUrl = '/api/posts';
const CancelToken = axios.CancelToken;
let source;


export const getPostById = (id) => {
  configureHttpHeaders(axios);
  if (source !== undefined && source !== '') {
    source.cancel('Operation canceled by the user.');
  }
  // regenerate cancelToken
  source = CancelToken.source();
  return get(`/${id}`, source.token);
}

export const getAllPosts = () => {
  configureHttpHeaders(axios);
  if (source !== undefined && source !== '') {
    source.cancel('Operation canceled by the user.');
  }
  // regenerate cancelToken
  source = CancelToken.source();
  return get('', source.token);
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
