/* eslint-disable prettier/prettier */
import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import store from "./store";
import VueSidebarMenu from "vue-sidebar-menu";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import "font-awesome/css/font-awesome.css";

import "./registerServiceWorker";

library.add(faUserSecret);

Vue.use(VueSidebarMenu);
Vue.use(VueAxios, Axios);
Vue.use(BootstrapVue);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
