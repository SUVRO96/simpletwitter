import { combineReducers } from "redux";
import { reducerLogin } from "../components/Users/reducerLogin";

const reducers = combineReducers({
  login: reducerLogin,
});

export default reducers;
