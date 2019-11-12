/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Pesqusia from "../views/Pesquisa.vue";
import Resultado from "../views/Resultado.vue";
import Administrativo from "../views/Administrativo.vue";

Vue.use(VueRouter);

const routes = [
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
    path: "/resultado",
    name: "Resultado",
    component: Resultado,
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
