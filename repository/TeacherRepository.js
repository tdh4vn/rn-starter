import UserRepository from './UserRepository';
import Config from '../constants/Config';
import axios from 'axios';
let instance = null;

export default class TeacherRepository {
  _teachers = null
  constructor() {
  }

  static getInstance() {
    if (instance == null) {
      instance = new TeacherRepository();
    }
    return instance;
  }

  async getTeachers() {
    if (this._teachers != null) return this._teachers;
    try {
      const token = await UserRepository.getInstance().getToken();
      const response = await axios.get(`${Config.API_URL}/user/users?token=${token}&typeUser=teacher`)
      if (!response.data.success) {
        throw (new Error(response.data.message))
      } else {
        this._teachers = response.data.data.users;
        return this._teachers;
      }
    } catch (e) {
      throw e
    }
  }
}