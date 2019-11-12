<template>
  <b-container>
    <h1>Pesquisa {{ postId }}</h1>

    <b-input-group>
      <b-form-input placeholder="Digite os termos de pesquisa"> </b-form-input>
      <b-button variant="outline-success">buscar</b-button>
    </b-input-group>

    <p>{{ posts.length }} resultados encontrados</p>

    <b-list-group>
      <b-list-group-item
        v-for="post in posts"
        v-bind:key="post.id"
        button
        @click="openModal(post.id)"
      >
         @{{ post.username}} - {{ post.username }} <br>
         {{post.text}}
      </b-list-group-item>
    </b-list-group>

    <b-modal
      id="post-info-modal"
      content-class="shadow"
      title="Detalhes de postagem"
    >
      <p class="my-2">Post id: {{ postId }}</p>
    </b-modal>
  </b-container>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      currentPage: 0,
      postId: {},
      posts: []
    };
  },
  computed: {
    rows() {
      return this.posts.length;
    }
  },
  methods: {
    openModal(id) {
      this.postId = id;
      this.$bvModal.show("post-info-modal");
    }
  },
  async mounted() {
    const response = await Axios.get("http://localhost:8080/PlnTCS/api/posts?key=1575631198790");
    console.log(response);
    this.posts = response.data;
  }
};
</script>

<style></style>
