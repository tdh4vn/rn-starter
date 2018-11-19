import { AsyncStorage } from "react-native";
import UserRepository from '../repository/UserRepository';

export const CHECK_LOGGED = 'CHECK_LOGGED';

export function checkLogin() {
  return async (dispatch) => {
    dispatch({
      type: CHECK_LOGGED,
      checkLoginState: 1,
    })
    try {
      const logged = await UserRepository.getInstance().checkLogged();
      if (!logged) {
        dispatch({
          type: CHECK_LOGGED,
          checkLoginState: 3
        })
      } else {
        const token = await UserRepository.getInstance().getToken();
        const profile = await UserRepository.getInstance().getProfile();
        dispatch({
          type: CHECK_LOGGED,
          checkLoginState: 2,
          token,
          profile,
        })
      }
    } catch (e) {
      dispatch({
        type: CHECK_LOGGED,
        checkLoginState: 3
      })
    }
  }
}