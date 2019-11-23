<template>
  <b-container>
    
      <b-card title="Login" class="login d-flex justify-content-center">
        <b-card-text >
          <b-form-input
            
            placeholder="nome do usuário"
            v-model="username"
          >
          </b-form-input>
          <b-form-input class="my-1" placeholder="senha" type="password" v-model="password">
          </b-form-input>
          <b-button class="my-1" variant="success" @click="doLogin()"
            >Login</b-button
          >
        </b-card-text>
      </b-card>
    
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
      if (this.username.length  == "" || this.password == "") {
        this.toast("Erro", "Não foi possível realizar o login");
        return;
      } 
      const response = await api.getAuth(this.username, this.password);
      console.log(response)
      
      if (response.status == 200) {
        console.log(response)
        localStorage.setItem("key" , response.data.key)
        this.toast("Login realizado" , response);
        this.$router.push("/pesquisa");
      } 
      if (response.status == 401) {
        this.toast("Erro", "Não foi possível realizar o login");
      }
      
    },
  },
};
</script>

<style>
.login {
  margin-left: 10%;
  margin-top: 60%;
  
}
</style>
