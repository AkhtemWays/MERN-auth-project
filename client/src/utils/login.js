import { authUser } from "../localStorageNames";

export function login(data) {
  localStorage.setItem(
    authUser,
    JSON.stringify({ token: data.token, userId: data.userId })
  );
}
