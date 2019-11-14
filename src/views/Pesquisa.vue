<template>
  <b-container>
    <h1>Pesquisa</h1>

    <b-input-group>
      <b-form-input
        placeholder="Digite os termos de pesquisa"
        v-model="message"
      >
      </b-form-input>
      <b-button variant="outline-success" @click="doSearch()">buscar</b-button>
    </b-input-group>

    <p>{{ posts.length }} resultados encontrados</p>

    <b-list-group>
      <b-list-group-item
        v-for="post in posts"
        v-bind:key="post.id"
        button
        @click="openModal(post)"
      >
        <b-row>
          <b-col cols="10">
            @{{ post.username }} - {{ post.name }} - Followers:
            {{ post.followers }} <br />
            {{ post.text }} <br />
            {{ post.date }}
          </b-col>
          <b-col cols="2">
            {{ post.relevance === 0 ? "" : post.relevance }}
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>

    <b-modal
      id="post-info-modal"
      content-class="shadow"
      :title="`Detalhes de postagem id: ${postSelected.id}`"
    >
      <highlightable-input
        highlight-style="background-color:yellow"
        :highlight-enabled="true"
        :highlight="highlight"
        v-model="postSelected.text"
      />

      <b-badge style="background-color:#4894f7">Nome Próprio</b-badge>
      <b-badge style="background-color:">Organização</b-badge>
      <b-badge style="background-color:">Local</b-badge>
      <b-badge style="background-color:#fa7066">Verbo</b-badge>
      <b-badge style="background-color:">Número</b-badge>
      <b-badge style="background-color:">Data</b-badge>
      <b-badge style="background-color:">Substantivo</b-badge>
    </b-modal>
  </b-container>
</template>

<script>
import Axios from "axios";
import HighlightableInput from "vue-highlightable-input";

export default {
  components: {
    HighlightableInput
  },
  data() {
    return {
      message: "Carlos peruca Rio 2019",
      currentPage: 0,
      postSelected: {},
      postId: {},
      posts: [],
      highlight: [],
    };
  },
  computed: {
    rows() {
      return this.posts.length;
    }
  },
  methods: {
    openModal(post) {
      this.getEntities(post.text);
      this.postSelected = post;
      this.$bvModal.show("post-info-modal");
    },
    async getEntities(message) {
      const response = await Axios.get(`http://localhost:8080/PlnTCS/api/query?key=1335809234&text=${message}`);
      const data = response.data;
      this.makeHighlits(data.entitys);
    },
    makeHighlits(entities) {
      entities.forEach(e => {
        console.log(e);
        if (e.type == "ACTION") {
          this.highlight.push({text: e.description.trim() , style: "background-color:#fa7066" }) // vermelho
        }
        if (e.type == "NOUN") {
          this.highlight.push({text: e.description.trim() , style: "background-color:#f7dfb2" }) // amarelo claro
        }
        if (e.type == "ORGANIZATION") {
          this.highlight.push({text: e.description.trim() , style: "background-color:#8ef597" }) // verde
        }
        if (e.type == "PERSON") {
          this.highlight.push({text: e.description.trim() , style: "background-color:#4894f7" }) // azul
        }
        if (e.type == "NUMBER") {
          this.highlight.push({text: e.description.trim() , style: "background-color:#cce2ff" }) // azul claro
        }

      });


    },
    async doSearch() {
      console.log(this.message);
      const response = await Axios.get(
        `http://localhost:8080/PlnTCS/api/posts?key=1335809234&text=${this.message}`
      );
      console.log(response);
      this.posts = response.data;
    }
  },
  async mounted() {
    const response = await Axios.get(
      "http://localhost:8080/PlnTCS/api/posts?key=1335809234"
    );
    console.log(response);
    this.posts = response.data;
  }
};
</script>

<style></style>
