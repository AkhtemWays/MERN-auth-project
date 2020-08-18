import { AUTHORIZE, FAILED_TO_FETCH, LOGOUT, LOAD_USERS } from "./types";

const initialData = {
  isAuthorized: false,
  users: [],
};

export const authReducer = (state = initialData, action) => {
  switch (action.type) {
    case AUTHORIZE:
      return {
        ...state,
        isAuthorized: true,
      };
    case FAILED_TO_FETCH:
      return {
        ...state,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthorized: false,
      };
    case LOAD_USERS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};
