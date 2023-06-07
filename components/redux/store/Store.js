import { combineReducers, createStore } from "redux";
import Reducers from "../reducers/Reducers";
import ThemeReducer  from "../reducers/ThemeReducer";
 
const combineReducer  = combineReducers({
      store :Reducers,
      changeTheme:ThemeReducer
})
 export const Store = createStore(combineReducer) ; 