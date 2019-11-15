import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    key: null,
  },
  mutations: {
    getUser() {
      return this.user;
    },
    setUser(user) {
      this.user = user;
    },
  },
  actions: {},
  modules: {},
});
