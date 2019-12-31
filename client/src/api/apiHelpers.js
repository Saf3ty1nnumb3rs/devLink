import { loadState } from '../store/browserStorage';

export function configureHttpHeaders(axios) {
  const sessionToken = loadState('token') || '';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Accept'] = 'text/csv,application/pdf,application/json';
  if (sessionToken !== '') axios.defaults.headers.common['x-auth-token'] = sessionToken;
};

export default {
  configureHttpHeaders
};