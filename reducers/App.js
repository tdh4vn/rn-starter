
import actions from "../actions"

let appState = {
  checkLoginState: 0, // 1: checking, 2 not login, 3 logged
  loginState: 0,
  token: "",
  profile: null,
  message: "",
};

const appReducer = (state = appState, action) => {
  switch (action.type) {
    case actions.CHECK_LOGGED:
      if (action.checkLoginState == 1) {
        state = Object.assign({}, state, { checkLoginState: action.checkLoginState })
      } else if (action.checkLoginState == 2) {
        state = Object.assign({}, state, {
          checkLoginState: action.checkLoginState,
          token: action.token,
          profile: action.profile
        })
      } else if (action.checkLoginState == 3) {
        state = Object.assign({}, state, {
          checkLoginState: action.checkLoginState,
          message: action.message
        })
      }
      return state;
    case actions.LOGIN_AS_FACEBOOK:
      if (action.loginState == 1) {
        state = Object.assign({}, state, { loginState: action.loginState })
      } else if (action.loginState == 2) {
        state = Object.assign({}, state, {
          loginState: action.loginState,
          token: action.token,
          profile: action.profile
        })
      } else if (action.loginState == 3) {
        state = Object.assign({}, state, {
          loginState: action.loginState,
          message: action.message
        })
      }
      return state;
    default:
      return state;
  }
};

export default appReducer;