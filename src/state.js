const state = {};

const withState = (listName, command) => {
  state[listName] = command(state[listName] || []);
}

const getState = () => {
  return {...state};
}

module.exports = {
  withState,
  getState,
}
