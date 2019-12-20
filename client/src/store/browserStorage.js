export function loadState(statePart) {
  try {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);

    if (statePart) {
      return state[statePart];
    } else {
      return state;
    }
  } catch (error) {
    return undefined;
  }
}

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  } catch (error) {
    console.log('sessionStorage serialization error:', error); // eslint-disable-line
  }
}
