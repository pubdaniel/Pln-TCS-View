<template>
  <b-container>
    <h1>Histórico de pesquisas</h1>

    <b-table :items="queries" :fields="fields" small> </b-table>
  </b-container>
</template>

<script>
import Axios from "axios";


export default {
  async mounted() {
    const response = await Axios.get("http://localhost:8080/PlnTCS/api/query/all?key=1335809234");
    console.log(response);
    this.queries = response.data;
  },
  data() {
    return {
      fields: ['message', 'date', 'relevance'],
      queries: [],
    };
  },
};
</script>

<style></style>
