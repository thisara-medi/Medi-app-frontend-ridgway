import axios from "axios";

export function authUser(loginUser: any) {
  return axios.post(`https://pms-endpoints-ridgway.azurewebsites.net/api/auth/login`, loginUser);
}

