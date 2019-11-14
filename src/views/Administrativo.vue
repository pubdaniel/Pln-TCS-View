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
import Axios from "axios";


export default {
  async mounted() {
    const response = await Axios.get("http://localhost:8080/PlnTCS/api/query/all?key=1335809234");
    console.log(response);
    this.queries = response.data;
    
  },
  data() {
    return {
      
      fields: [{key: 'message', label: "Texto"}, {key : 'date', sortable: true, label: "Data" }, { key: 'relevance', label: "Assertividade média"}, {key: 'user', label: "Usuário" }],
      queries: [],
    };
  },
};
</script>

<style></style>
