import AuthReducer from "./AuthReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  auth: AuthReducer,
});

export default allReducers;
