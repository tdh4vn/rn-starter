export const CHECK_LOGGED = 'CHECK_LOGGED';

export function checkLogin() {
  return (dispatch) => {
    dispatch({
      type: CHECK_LOGGED,
      checkLoginState: 1,
    })
    setTimeout(() => {
      dispatch({
        type: CHECK_LOGGED,
        checkLoginState: 2,
      })
    }, 2000);
  }
}