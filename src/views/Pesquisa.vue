<template>
  <b-container >
      <b-row align-h="center">
    <b-col cols="4" md="auto">
    <h1>Pesquisa</h1>
    <b-input-group>
      <b-form-input
        placeholder="Digite os termos de pesquisa"
        v-model="message"
      >
      </b-form-input>
      <b-button variant="outline-success" @click="doSearch()">
        <b-spinner type="grow" v-show="isLoading" small ></b-spinner>
        buscar
        </b-button>
        <b-button variant="outline-warning" @click="doTeste()">
        <b-spinner type="grow" v-show="isTesteLoading" small ></b-spinner>
        Teste
        </b-button>
    </b-input-group>

    <p>{{ rows }} resultados encontrados</p>
    
    <b-card v-show="isEntitiesTestNotEmpty">
       <b-table striped hover :items="entitiesTest"></b-table>
    </b-card>

    <b-table striped hover :items="posts" :fields="fieldsPosts"></b-table>

    <!-- <b-list-group v-show="showListPosts">
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
    </b-list-group> -->



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
        aria-disabled="true"
      />

      <b-badge style="background-color:#4894f7">Nome Próprio</b-badge>
      <b-badge style="background-color:#8ef597">Organização</b-badge>
      <b-badge style="background-color:#FF66B2">Local</b-badge>
      <b-badge style="background-color:#fa7066">Verbo</b-badge>
      <b-badge style="background-color:#cce2ff">Número</b-badge>
      <b-badge style="background-color:#FFB266">Data</b-badge>
      <b-badge style="background-color:#cccc00">Substantivo</b-badge>
    </b-modal>

    </b-col>
      </b-row>
  </b-container>
</template>

<script>
import axios from "../axios/axios.js";
import HighlightableInput from "vue-highlightable-input";

export default {
  components: {
    HighlightableInput,
  },
  data() {
    return {
      fieldsPosts: [{"name" : "Nome"}, { "place" : "Local"} , { "text" : "Mansagem" } , {"date" : "Data"}, {"relevance": "Relevância"} ],

      entitiesTest:[],
      entities: [],
      isTesteLoading: false,
      showListPosts: false,
      isLoading: false,
      key: null,
      message: "",
      currentPage: 0,
      postSelected: {},
      postId: {},
      posts: [],
      highlight: [],
    };
  },
  computed: {
    rows() {
      return this.posts != undefined ? this.posts.length : 0 ;
    },
    isEntitiesTestNotEmpty() {
        return this.entitiesTest.length > 0;
      }
  },
  methods: {
    async doTeste() {
      this.isTesteLoading = true;
      const entities = await axios.getEntities(localStorage.getItem("key"), this.message);
      this.entitiesTest = entities;
      this.isTesteLoading = false;

    },
    openModal(post) {
      this.highlight = [];
      this.getEntities(post.text);
      this.postSelected = post;
      this.$bvModal.show("post-info-modal");
      
    },
    async getEntities(message) {
      const entities = await axios.getEntities(localStorage.getItem("key"), message);
      this.makeHighlits(entities);
    },
    makeHighlits(entities) {
      entities.forEach(e => {
        console.log(e);
        if (e.type == "ACTION") {
          this.highlight.push({
            text: e.description.trim(),
            style: "background-color:#fa7066",
          }); // vermelho
        }
        if (e.type == "NOUN") {
          this.highlight.push({
            text: e.description.trim(),
            style: "background-color:#cccc00",
          }); // amarelo claro
        }
        if (e.type == "ORGANIZATION") {
          this.highlight.push({
            text: e.description.trim(),
            style: "background-color:#8ef597",
          }); // verde
        }
        if (e.type == "PERSON") {
          this.highlight.push({
            text: e.description.trim(),
            style: "background-color:#4894f7",
          }); // azul
        }
        if (e.type == "NUMBER") {
          this.highlight.push({
            text: e.description.trim(),
            style: "background-color:#cce2ff",
          }); // azul claro
        }
        if (e.type == "DATE") {
          this.highlight.push({
            text: e.description.trim(),
            style: "background-color:#FFB266",
          }); // 
        }

      });
    },
    async doSearch() {
      this.showListPosts = false;
      this.isLoading = true; 
      const response = await axios.getPostsWithFilter(localStorage.getItem("key"), this.message);
      console.log(response)
      this.posts = response;
      this.isLoading = false;
      this.showListPosts = true;
      
    },
  },
  created() {
    this.key = localStorage.getItem("key")
    if (this.key == null || this.key == "null" || this.key == "") {
      this.$router.push("/");
    } 
  },
  async mounted() {
    const response = await axios.getPosts(this.key);
    if (response.status == 200) {
      console.log(response);
      this.posts = response.data;
      this.key = this.$store.state.key;
      this.showListPosts = true;
    } else {
      console.log("redirecionamento");
      await this.$router.push("Login");
      console.log("montou");
    }
  },
};
</script>

<style></style>
