import axios from "axios";
import { getTokenLocalStorage } from "../reducer/reducer";
export const GET_USERS = "GET_USERS";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

const config = {
  headers: {
    "Access-Control-Allow-Headers": "x-access-token",
    "x-access-token": getTokenLocalStorage(),
  },
};

export function getUsers() {
  return async function (dispatch) {
    const result = await axios.get("http://localhost:3001/users", config);
    dispatch({ type: GET_USERS, payload: result.data });
  };
}

export function signUp(username, email, password) {
  return async function (dispatch) {
    const token = await axios.post("http://localhost:3001/users/signup", {
      username,
      email,
      password,
    });
    dispatch({ type: SIGNUP, payload: token.data.token });
  };
}

export function logIn(username, email, password) {
  return async function (dispatch) {
    const token = await axios.post("http://localhost:3001/users/login", {
      username,
      email,
      password,
    });
    dispatch({ type: LOGIN, payload: token.data.token });
  };
}
