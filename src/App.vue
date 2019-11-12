<template>
  <div id="app text-center">
    <div id="nav">
      <Menu />
    </div>
    <router-view />
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
