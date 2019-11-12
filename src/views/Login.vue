<template>
  <b-container class="row d-flex justify-content-center">
    <b-container class="col-md-6">
      <b-card title="Login" style="max-width: 20rem;" class="mb-2">
        <b-card-text>
          <b-form-input class="my-1 " placeholder="nome do usuário">
          </b-form-input>
          <b-form-input class="my-1" placeholder="senha"> </b-form-input>
          <b-button class="my-1" variant="success" @onclick="doLogin"
            >Login</b-button
          >
        </b-card-text>
      </b-card>
    </b-container>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    doLogin() {
      //envia requisição de login
      //guarda usuário no store
      //id ($store.usuario != null) vai para pesquisa
    },
  },
};
</script>

<style></style>
