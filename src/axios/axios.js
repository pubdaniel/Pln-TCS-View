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
  async getEntities(key, message) {
    const response = await HTTP.get(`query?key=${key}&text=${message}`);
    return response.data.entitys;
  },
  async getAuth(user, pass) {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/PlnTCS/api/user/login",
        data: qs.stringify({ username: user, password: pass }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      console.log(response)
      return response;
    }  catch (err) {
      return err;
    }
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
  },
  async getPostsWithFilter(key, message) {
    const response = await HTTP.get(`posts?key=${key}&text=${message}`);
    console.log(response.data)
    return response.data
  }
  
};
