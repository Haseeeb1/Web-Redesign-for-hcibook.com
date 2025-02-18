import { createStore, applyMiddleware, combineReducers } from "redux";
import authReducer from "./authReducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
