<template>
  <div id="app text-center">
    <div id="nav">
      <Menu />
    </div>
    <b-row class="justify-content-md-center">
      <b-col cols="12" md="auto">
        <router-view />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";

export default {
  components: {
    Menu,
  },
};
</script>

<style lang="scss"></style>
