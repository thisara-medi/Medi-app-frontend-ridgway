import axios from "axios";

export function authUser(loginUser: any) {
  return axios.post(`https://localhost:7160/api/auth/login`, loginUser);
}

