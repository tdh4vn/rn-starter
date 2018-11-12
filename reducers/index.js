import { combineReducers } from 'redux';
import appReducer from './App';



//Combine all the reducers
const rootReducer = combineReducers({
  appReducer,
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})

export default rootReducer;