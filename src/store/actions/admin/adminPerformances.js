import axios from "axios";
import { FETCH_ADMIN_PERFORMANCE_LIST } from "../types";
import { authError } from "../../actions/index";

const ROOT_URL = "http://localhost:4000";

export function fetchAdminPerformanceList() {
  return function(dispatch) {
    let url = `${ROOT_URL}/performances`;
    let token = localStorage.getItem("token");
    let headers = { authorization: token };
    axios
      .get(url, { headers })
      .then(performances => {
        console.log(performances, "PERFORMANCEs");
        dispatch({
          type: FETCH_ADMIN_PERFORMANCE_LIST,
          payload: performances.data
        });
      })
      .catch(err => {
        dispatch(authError(err.response.data.message));
      });
  };
}