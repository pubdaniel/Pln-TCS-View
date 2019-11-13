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
            {{ post.relevance === 0 ? "" : post.relevance  }}
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>

    <b-modal
      id="post-info-modal"
      content-class="shadow"
      :title="`Detalhes de postagem id: ${postSelected.id}`"
    >
      {{ postSelected.text }}

      <highlightable-input
        highlight-style="background-color:yellow"
        :highlight-enabled="true"
        :highlight="highlight"
        v-model="postSelected.text"
      />
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
      highlight: [
        { text: "Presidente", style: "background-color:#f37373" },
        { text: "enfrenta", style: "background-color:#fca88f" },
        { text: "senhor", style: "background-color:#bbe4cb" },
        { text: "compreendo", style: "background-color:#fff05e" },
        "whatever",
        { start: 2, end: 5, style: "background-color:#f330ff" }
      ]
    };
  },
  computed: {
    rows() {
      return this.posts.length;
    }
  },
  methods: {
    openModal(post) {
      this.postSelected = post;
      this.$bvModal.show("post-info-modal");
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
