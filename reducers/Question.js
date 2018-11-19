
import actions from "../actions"

let questionState = {
  levels: [],
  subjects: [],
  questions: [],
  getLevelState: 0,
  getSubjectState: 0,
  addQuestionState: 0,
  getQuestionState: 0,
  getQuestionMessage: "",
  question: null,
  message: ""
};

const questionReducer = (state = questionState, action) => {
  switch (action.type) {
    case actions.GET_QUESTIONS:
      if (action.state == 1) {
        state = Object.assign({}, state, { getQuestionState: action.state, getQuestionMessage: "Đang lấy dữ liệu" })
      } else if (action.state == 2) {
        state = Object.assign({}, state, {
          getQuestionState: action.state,
          questions: action.questions
        })
      } else if (action.state == 3) {
        state = Object.assign({}, state, {
          getQuestionState: action.state,
          getQuestionMessage: action.message
        })
      }
      return state;
    case actions.GET_SUBJECTS:
      if (action.state == 1) {
        state = Object.assign({}, state, { getSubjectState: action.state })
      } else if (action.state == 2) {
        state = Object.assign({}, state, {
          getSubjectState: action.state,
          subjects: action.subjects
        })
      } else if (action.state == 3) {
        state = Object.assign({}, state, {
          getSubjectState: action.state,
          message: action.message
        })
      }
      return state;
    case actions.GET_LEVELS:
      if (action.state == 1) {
        state = Object.assign({}, state, { getLevelState: action.state })
      } else if (action.state == 2) {
        state = Object.assign({}, state, {
          getLevelState: action.state,
          levels: action.levels
        })
      } else if (action.state == 3) {
        state = Object.assign({}, state, {
          getLevelState: action.state,
          message: action.message
        })
      }
      return state;
    case actions.CREATE_QUESTION:
      if (action.state == 1) {
        state = Object.assign({}, state, { addQuestionState: action.state })
      } else if (action.state == 2) {
        state = Object.assign({}, state, {
          addQuestionState: action.state,
          question: action.question
        })
      } else if (action.state == 3) {
        state = Object.assign({}, state, {
          addQuestionState: action.state,
          message: action.message
        })
      }
      return state;
    default:
      return state;
  }
};

export default questionReducer;