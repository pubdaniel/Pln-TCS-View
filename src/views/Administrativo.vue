<template>
  <b-container>
    <h1>Histórico de pesquisas</h1>

    <b-table small :fields="fields" :items="queries" responsive="sm">
      <template v-slot:cell(user)="data">
        {{ data.item.user.name }}
      </template>
    </b-table>
  </b-container>
</template>

<script>
import axios from "../axios/axios.js";

export default {
  methods: {
    redireciona() {
      this.$router.push("/");
    },
  },
  
  async created() {

    const key = localStorage.getItem("key");
    this.user = await axios.getUser(key);
    
    if (this.user.permission == null) {
      this.redireciona("/");
    } else {
      if (this.user.permission == 1) {
        console.log("Sem permissão")
        this.redireciona("/");
        return;
      } else {
        const response = await axios.getQueries(localStorage.getItem("key"));
        console.log(response);
        this.queries = response.data;
        console.log("com permissão")
      }
    }

  },
  data() {
    return {
      user: undefined,
      fields: [{key: 'message', label: "Texto"}, {key : 'date', sortable: true, label: "Data" }, { key: 'relevance', label: "Assertividade média"}, {key: 'user', label: "Usuário" }],
      queries: [],
    };
  },
};
</script>

<style></style>
