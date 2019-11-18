<template>
  <div><sidebar-menu width="200px" :collapsed="true" :menu="menu" /></div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          href: "/logout",
          title: "logout",
          icon: "fa fa-sign-out",
        },
        {
          header: true,
          title: "Main Navigation",
          hiddenOnCollapse: true,
          icon: "fa fa-cog",
        },
        {
          href: "/dashboard",
          title: "Administrativo",
          icon: "fa fa-cog",
          
        },
        {
          href: "/pesquisa",
          title: "Pesquisa",
          icon: "fa fa-search",
        },
      ],
    };
  },
};
</script>
