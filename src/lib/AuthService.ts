import axios from "axios";

export function authUser(loginUser: any) {
  return axios.post(`pmsridgway.azurewebsites.net/api/auth/login`, loginUser);
}

