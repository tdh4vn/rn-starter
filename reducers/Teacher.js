
import actions from "../actions"

let teacherState = {
  teachers: [],
  state: 0,
  message: ""
};

const teacherReducer = (state = teacherState, action) => {
  switch (action.type) {
    case actions.GET_TEACHERS:
      if (action.state == 1) {
        state = Object.assign({}, state, { state: action.state })
      } else if (action.state == 2) {
        state = Object.assign({}, state, {
          state: action.state,
          teachers: action.teachers
        })
      } else if (action.state == 3) {
        state = Object.assign({}, state, {
          state: action.state,
          message: action.message
        })
      }
      return state;
    default:
      return state;
  }
};

export default teacherReducer;