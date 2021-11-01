<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="true"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />
      <v-spacer />

      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-badge
          v-if="$store.state.user.items.length > 0"
          color="green"
          left
          :content="$store.state.user.items.length"
        >
          <v-icon> mdi-menu </v-icon>
        </v-badge>
        <v-icon v-else> mdi-menu </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      width="350"
      v-model="rightDrawer"
      :right="true"
      temporary
      fixed
    >
      <Cart @click.native="right = !right" />
    </v-navigation-drawer>
    <v-footer app>
      <span>&copy; Powered by <a href="/">Ogabek Yuldoshev</a></span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      cartLength: 5,
      clipped: false,
      drawer: true,
      items: [
        {
          icon: "mdi-order-bool-ascending-variant",
          title: "Foods",
          to: "/",
        },
        {
          icon: "mdi-food",
          title: "Foods",
          to: "/foods",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "FOODEX Menu",
    };
  },
  mounted() {
    this.$store.commit('user/checkLocalStorage')
  },
};
</script>
