import { AUTHORIZE, FAILED_TO_FETCH } from "./types";

const initialData = {
  isAuthorized: false,
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

    default:
      return state;
  }
};