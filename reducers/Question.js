
import actions from "../actions"

let questionState = {
  levels: [],
  subjects: [],

  questions: [],

  requestQuestion: null,
  onNewRequest: false,

  getLevelState: 0,
  getSubjectState: 0,
  addQuestionState: 0,
  getQuestionState: 0,
  getQuestionMessage: "",
  question: null,
  message: "",
  renderFlag: false,
};

const questionReducer = (state = questionState, action) => {
  console.log(action.type)
  switch (action.type) {
    case actions.ON_NEW_QUESTION: {
      state = Object.assign({}, state, { onNewRequest: true, requestQuestion: action.question })
      return state;
    }
    case actions.CANCEL_NEW_QUESTION: {
      state = Object.assign({}, state, { onNewRequest: false, requestQuestion: null })
      return state;
    }
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
      } else if (action.state == 0) {
        state = Object.assign({}, state, {
          getQuestionState: action.state,
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
      } else if (action.state == 0) {
        state = Object.assign({}, state, {
          addQuestionState: 0,
          message: ""
        })
      }
      return state;
    default:
      return state;
  }
};

export default questionReducer;