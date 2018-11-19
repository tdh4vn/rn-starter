import { combineReducers } from 'redux';
import appReducer from './App';
import questionReducer from './Question';
import teacherReducer from './Teacher';



//Combine all the reducers
const rootReducer = combineReducers({
  app: appReducer,
  question: questionReducer,
  teacher: teacherReducer
})

export default rootReducer;