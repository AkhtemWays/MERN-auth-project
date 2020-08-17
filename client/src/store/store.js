import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { authReducer } from "./authReducer";
import thunk from "redux-thunk";

export const store = createStore(
  combineReducers({
    auth: authReducer,
  }),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
