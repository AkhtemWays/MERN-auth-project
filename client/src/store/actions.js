import { AUTHORIZE, FAILED_TO_FETCH, LOAD_USERS } from "./types";

export function authorize(url, body = null) {
  return async (dispatch) => {
    const headers = {};
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body,
        headers,
      });
      const data = await response.json();
      if (!data.errors) {
        dispatch({
          type: AUTHORIZE,
        });
        return data;
      }
      return data;
    } catch (e) {
      console.log("Невышло взять данные ", e.message);
      dispatch({
        type: FAILED_TO_FETCH,
      });
      return null;
    }
  };
}

export function register(
  url,
  method = "POST",
  body = null,
  headers = { "Content-Type": "application/json" }
) {
  return async (dispatch) => {
    if (body) {
      body = JSON.stringify(body);
    }
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
      });
      const data = await response.json();
      return data;
    } catch (e) {
      console.log("Невышло взять данные ", e.message);
      dispatch({
        type: FAILED_TO_FETCH,
      });
      return null;
    }
  };
}

export function getAllUsers(url, token) {
  return async (dispatch) => {
    console.log(token);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(url, {
        method: "GET",
        body: null,
        headers: headers,
      });

      if (response.ok) {
        const data = await response.json();
        if (data && !data.errors && data.users) {
          dispatch({
            type: LOAD_USERS,
            payload: data.users,
          });
          return data;
        }
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(`Client getAllUsers error, ${e.message}`);
      dispatch({
        type: FAILED_TO_FETCH,
      });
    }
  };
}
