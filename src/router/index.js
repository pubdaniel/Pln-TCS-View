/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Pesqusia from "../views/Pesquisa.vue";
import Administrativo from "../views/Administrativo.vue";
import Logout from "../views/Logout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/logout",
    name: "Logout",
    component:Logout,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/pesquisa",
    name: "Pesquisa",
    component: Pesqusia,
  },
  {
    path: "/dashboard",
    name: "Administrativo",
    component: Administrativo,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
