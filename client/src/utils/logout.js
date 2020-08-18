import { authUser } from "../localStorageNames";

export function logout() {
  localStorage.removeItem(authUser);
}
