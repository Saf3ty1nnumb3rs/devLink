import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
import initialState from './initialState.js'

export default function (state = initialState.alerts, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
