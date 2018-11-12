import * as firebase from 'firebase'


export const LOGIN_AS_FACEBOOK = 'LOGIN_AS_FACEBOOK';

export function loginAsFacebook() {
  return (dispatch) => {
    dispatch({
      type: LOGIN_AS_FACEBOOK,
      checkLoginState: 1,
    })
    setTimeout(() => {
      dispatch({
        type: LOGIN_AS_FACEBOOK,
        checkLoginState: 2,
      })
    }, 2000);
  }
}