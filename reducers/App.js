
import actions from "../actions"

let appState = {
  checkLoginState: 0, // 1: checking, 2 not login, 3 logged
};

const appReducer = (state = appState, action) => {
  switch (action.type) {
    case actions.CHECK_LOGGED:
      state = Object.assign({}, state, { checkLoginState: action.checkLoginState });
      return state;
    default:
      return state;
  }
};


export default appReducer;