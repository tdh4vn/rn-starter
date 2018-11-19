import { AsyncStorage } from "react-native";
let instance = null;

export default class UserReposiotry {
  _token = null
  _profile = null
  constructor() {
  }

  static getInstance() {
    if (instance == null) {
      instance = new UserReposiotry();
    }
    return instance;
  }

  async setToken(token) {
    try {
      this._token = token;
      await AsyncStorage.setItem('@Token', token);
    } catch (e) {

    }
  }

  async setProfile(profile) {
    try {
      this._profile = profile;
      await AsyncStorage.setItem('@Profile', JSON.stringify(profile));
    } catch (e) {

    }
  }

  async getToken() {
    if (this._token != null) return this._token;
    this._token = await AsyncStorage.getItem('@Token');
    return this._token
  }

  async getProfile() {
    if (this._profile != null) return this._profile;
    profileTxt = await AsyncStorage.getItem('@Profile');
    this._profile = JSON.parse(profileTxt);
    return this._profile;
  }

  async checkLogged() {
    this.getToken()
    this.getProfile()
    return !(this._profile == null || this._token == null);
  }

}