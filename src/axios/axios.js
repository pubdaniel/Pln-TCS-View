/* eslint-disable prettier/prettier */
import axios from "axios";
import qs from "qs";

export const HTTP = axios.create({
  baseURL: `http://localhost:8080/PlnTCS/api/`,
});

export default {
  data() {
    return {};
  },
  async getEntities(message) {
    const response = axios.get`query?key=1335809234&text=${message}`;
    return response.data;
  },
  async getAuth(user, pass) {
    const response = await axios({
      method: "post",
      url: "http://localhost:8080/PlnTCS/api/user/login",
      data: qs.stringify({ username: user, password: pass }),
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    return response.data.key;
  },
  async getUser(key) {
    const response = await HTTP.get(`/user?key=${key}`);
    return response.data;
  },
  async getQueries(key) {
      return await HTTP.get(`/query/all?key=${key}`)
  },
  async getPosts(key) {
    return await HTTP.get(`/posts?key=${key}`)
  }
  
};
