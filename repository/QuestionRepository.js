import UserRepository from './UserRepository';
import Config from '../constants/Config';
import axios from 'axios';
let instance = null;

export default class QuestionReposiotry {
  _subjects = null
  _levels = null
  _questions = null
  constructor() {
  }

  static getInstance() {
    if (instance == null) {
      instance = new QuestionReposiotry();
    }
    return instance;
  }

  async getQuestions(status) {
    try {
      const token = await UserRepository.getInstance().getToken();
      const response = await axios.get(`${Config.API_URL}/user/questions?token=${token}&status=${status}`)
      if (!response.data.success) {
        throw (new Error(response.data.message))
      } else {
        this._questions = response.data.data.questions;
        return this._questions;
      }
    } catch (e) {
      throw e
    }
  }

  async getQuestionsChatbox() {
    try {
      const token = await UserRepository.getInstance().getToken();
      const response = await axios.get(`${Config.API_URL}/user/questions-chatbox?token=${token}`)
      if (!response.data.success) {
        throw (new Error(response.data.message))
      } else {
        this._questions = response.data.data.questions;
        return this._questions;
      }
    } catch (e) {
      throw e
    }
  }

  async answerQuestion(questionId, answer) {
    try {
      const token = await UserRepository.getInstance().getToken();
      const response = await axios.put(
        `${Config.API_URL}/user/question-answer/${questionId}?token=${token}`, answer)
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message);
    } catch (e) {
      throw (e)
    }
  }

  async cancelGetQuestion(questionId) {
    try {
      const token = await UserRepository.getInstance().getToken();
      const response = await axios.put(
        `${Config.API_URL}/user/question-status/${questionId}?token=${token}`, {
          status: 0
        })
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message);
    } catch (e) {
      throw (e)
    }
  }

  async confirmGetQuestion(questionId) {
    try {
      const token = await UserRepository.getInstance().getToken();
      const response = await axios.put(
        `${Config.API_URL}/user/question-status/${questionId}?token=${token}`, {
          status: 3
        })
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message);
    } catch (e) {
      throw (e)
    }
  }

  async markDoneQuestion(questionId) {
    try {
      const token = await UserRepository.getInstance().getToken();
      const response = await axios.put(
        `${Config.API_URL}/user/question-status/${questionId}?token=${token}`, {
          status: 4
        })
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message);
    } catch (e) {
      throw (e)
    }
  }

  async createQuestion(question) {
    try {
      const token = await UserRepository.getInstance().getToken();
      const response = await axios.post(
        `${Config.API_URL}/user/question?token=${token}`, question);
      if (response.data.success) {
        console.log(response.data);
        return response.data.question;
      } else {
        throw (new Error(response.data.message));
      }
    } catch (e) {
      throw (e);
    }
  }

  async ratingAnswer(questionID, stars, comment) {
    try {
      const token = await UserRepository.getInstance().getToken();
      const response = await axios.put(
        `${Config.API_URL}/user/question-vote/${questionID}?token=${token}`, {
          stars,
          comment
        })
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error(response.data.message);
    } catch (e) {
      throw (e)
    }
  }

  async getSubjects() {
    if (this._subjects != null) return this._subjects;
    try {
      const token = await UserRepository.getInstance().getToken();
      const response = await axios.get(`${Config.API_URL}/user/subjects?token=${token}`)
      if (!response.data.success) {
        throw (new Error(response.data.message))
      } else {
        this._subjects = response.data.data.subjects;
        return this._subjects;
      }
    } catch (e) {
      throw e
    }
  }

  async getLevels() {
    if (this._levels != null) return this._levels;
    try {
      const token = await UserRepository.getInstance().getToken();
      const response = await axios.get(`${Config.API_URL}/user/levels?token=${token}`)
      if (!response.data.success) {
        throw (new Error(response.data.message))
      } else {
        this._levels = response.data.data.levels;
        return this._levels;
      }
    } catch (e) {
      throw e
    }
  }
}