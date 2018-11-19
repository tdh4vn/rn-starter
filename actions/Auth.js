import axios from 'axios';
import Config from '../constants/Config';
import { AsyncStorage } from "react-native";
import UserRepository from "../repository/UserRepository";

export const LOGIN_AS_FACEBOOK = 'LOGIN_AS_FACEBOOK';

export function loginAsFacebook(idToken) {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_AS_FACEBOOK,
      loginState: 1,
    })
    try {
      const response = await axios.post(
        `${Config.API_URL}/user/login-facebook`, {
          firebaseToken: idToken
        })
      if (!response.data.success) {
        dispatch({
          type: LOGIN_AS_FACEBOOK,
          loginState: 3,
          message: response.data.message
        })
      } else {
        console.log(response.data)
        try {
          await UserRepository.getInstance().setToken(response.data.data.accessToken);
          await UserRepository.getInstance().setProfile(response.data.data.profile);
        } catch (e) {
          throw (e)
        }
        dispatch({
          type: LOGIN_AS_FACEBOOK,
          loginState: 2,
          accessToken: response.data.data.accessToken,
          profile: response.data.data.profile
        })
      }
    } catch (e) {
      dispatch({
        type: LOGIN_AS_FACEBOOK,
        loginState: 3,
        message: e.toString()
      })
    }
  }
}