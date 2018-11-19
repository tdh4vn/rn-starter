import axios from 'axios';
import Config from '../constants/Config';
import UserRepository from '../repository/UserRepository';
import QuestionRepository from '../repository/QuestionRepository';
import TeacherRepository from '../repository/TeacherRepository';

export const GET_SUBJECTS = 'GET_SUBJECTS';
export const GET_LEVELS = 'GET_LEVELS';
export const GET_TEACHERS = 'GET_TEACHERS';
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export function createQuestion(question) {
  return async (dispatch) => {
    dispatch({
      type: CREATE_QUESTION,
      state: 1
    })
    try {
      const result = await QuestionRepository.getInstance().createQuestion(question);
      dispatch({
        type: CREATE_QUESTION,
        state: 2,
        question: result
      })
    } catch (e) {
      dispatch({
        type: CREATE_QUESTION,
        state: 3,
        message: e.toString()
      })
    }
  }
}

export function getQuestions() {
  return async (dispatch) => {
    dispatch({
      type: GET_QUESTIONS,
      state: 1
    })
    try {
      const questions = await QuestionRepository.getInstance().getQuestions();
      console.log(questions)
      dispatch({
        type: GET_QUESTIONS,
        state: 2,
        questions,
      })
    } catch (e) {
      dispatch({
        type: GET_QUESTIONS,
        state: 3,
        message: e.toString()
      })
    }
  }
}

export function getSubjects() {
  return async (dispatch) => {
    dispatch({
      type: GET_SUBJECTS,
      state: 1,
    })
    try {
      const subjects = await QuestionRepository.getInstance().getSubjects();
      dispatch({
        type: GET_SUBJECTS,
        state: 2,
        subjects: subjects
      })
    } catch (e) {
      dispatch({
        type: GET_SUBJECTS,
        state: 3,
        message: e.toString()
      })
    }
  }
}

export function getLevels() {
  return async (dispatch) => {
    dispatch({
      type: GET_LEVELS,
      state: 1,
    })
    try {
      const levels = await QuestionRepository.getInstance().getLevels();
      dispatch({
        type: GET_LEVELS,
        state: 2,
        levels: levels
      })
    } catch (e) {
      dispatch({
        type: GET_LEVELS,
        state: 3,
        message: e.toString()
      })
    }
  }
}

export function getTeachers() {
  return async (dispatch) => {
    dispatch({
      type: GET_TEACHERS,
      state: 1
    })
    try {
      const teachers = await TeacherRepository.getInstance().getTeachers();
      dispatch({
        type: GET_TEACHERS,
        state: 2,
        teachers,
      })
    } catch (e) {
      dispatch({
        type: GET_TEACHERS,
        state: 3,
        message: e.toString()
      })
    }
  }
}