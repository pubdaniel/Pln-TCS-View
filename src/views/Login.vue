<template>
  <b-container class="row d-flex justify-content-center">
    <b-container class="col-md-6">
      <b-card title="Login" style="max-width: 20rem;" class="mb-2">
        <b-card-text>
          <b-form-input
            class="my-1 "
            placeholder="nome do usuário"
            v-model="username"
          >
          </b-form-input>
          <b-form-input class="my-1" placeholder="senha" v-model="password">
          </b-form-input>
          <b-button class="my-1" variant="success" @click="doLogin()"
            >Login</b-button
          >
        </b-card-text>
      </b-card>
    </b-container>
  </b-container>
</template>

<script>
import api from "../axios/axios.js";

export default {
  data() {
    return {
      username: "",
      password: "",
      user: {}
    };
  },
  methods: {
    async getUser(key) {
      const response = await api.getUser(key);
      this.user = response;
    },
   toast(title, text) {
        this.$bvToast.toast(text, {
          title: title
        })
      },
    async doLogin() {
      const response = await api.getAuth(this.username, this.password);
      if (response != null) {
        this.$store.state.key = response;
        localStorage.setItem("key" , response)
        this.toast("Login realizado" , response);
        this.$router.push("/pesquisa");

      } else {
        this.toast("Erro", "Não foi possível realizar o login");
      }
      //this.$store.user = response.data;
      //envia requisição de login
      //guarda usuário no store
      //id ($store.usuario != null) vai para pesquisa
    },
  },
};
</script>

<style></style>
