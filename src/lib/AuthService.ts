import axios from "axios";

export function authUser(loginUser: any) {
  return axios.post(`https://pmsridgway.azurewebsites.net/api/auth/login`, loginUser);
}

