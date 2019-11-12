<template>
  <b-container>
    <h1>Histórico de pesquisas</h1>

    <b-table :items="queries" small> </b-table>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      queries: [
        {
          id: 1,
          query: "busca sobre Pedro e Maria em Florianópolis",
          date: "01/01/01 12:00:00",
          results: 21,
          entitties: [
            {
              person: ["Pedro", "Maria"],
              location: ["FLorianópolis"],
            },
          ],
          accuracy: "25%",
        },
        {
          id: 2,
          query: "posts de 12 de maio de joão",
          date: "12/05/2019",
          results: 21,
          entitties: [
            {
              person: ["João"],
            },
          ],
          accuracy: "65%",
        },
      ],
    };
  },
};
</script>

<style></style>
