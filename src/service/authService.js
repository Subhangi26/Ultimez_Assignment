import api from "../api/axios";

/** POST /user/login — expects { login_id, password } */
export const loginUser = (data) => {
  return api.post("/login", data);
};

/** POST /user/register — expects full registration payload */
export const registerUser = (data) => {
  return api.post("/register", data);
};
