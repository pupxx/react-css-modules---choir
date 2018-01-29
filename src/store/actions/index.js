import axios from "axios";
import {
  AUTH_USER,
  FETCH_REHEARSALS,
  FETCH_MEMBER_INFO,
  AUTH_ERROR,
  UNAUTH_USER
} from "./types";
export * from "./performances";
export * from "./profile";
export * from "./churchs";

const ROOT_URL = "http://localhost:4000";

export function fetchRehearsals() {
  return function(dispatch) {
    const url = `${ROOT_URL}/rehearsals`;
    axios.get(url).then(rehearsals => {
      dispatch({ type: FETCH_REHEARSALS, payload: rehearsals.data });
    });
  };
}

export function signupUser({ email, password }, cb) {
  return function(dispatch) {
    const url = `${ROOT_URL}/signup`;
    axios
      .post(url, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem("token", response.data.token);
        return response;
      })
      .then(response => {
        cb();
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}

export function signinUser({ email, password }, goToLanding, goToRegister) {
  return function(dispatch) {
    const url = `${ROOT_URL}/signin`;
    const getMemberInfo = `${ROOT_URL}/members/member-info`;
    let token;
    let headers;
    return axios
      .post(url, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem("token", response.data.token);
        return response;
      })
      .then(() => {
        token = localStorage.getItem("token");
        headers = { authorization: token };
        return axios.get(getMemberInfo, { headers }).then(memberInfo => {
          dispatch({ type: FETCH_MEMBER_INFO, payload: memberInfo });
          if (memberInfo.data[0].firstname === "") {
            goToRegister();
          } else {
            goToLanding();
          }
          return memberInfo;
        });
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}

export function signOutUser() {
  localStorage.removeItem("token");
  return { type: UNAUTH_USER };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
