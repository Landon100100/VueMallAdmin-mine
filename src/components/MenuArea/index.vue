<template>
  <div class="menu-area-container">
    <a-menu
      :default-selected-keys="[defaultSelectKey]"
      :default-open-keys="[defaultOpenKey]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.menu.collapsed"
    >
      <template v-for="route in $store.state.menu.menuRoutes">
        <a-sub-menu v-if="!route.meta.hidden" :key="route.name">
          <span slot="title">
            <a-icon :type="route.meta.icon" />
            <span>{{ route.meta.title }}</span>
          </span>
          <template v-for="child in route.children">
            <a-menu-item :key="child.name">
              <router-link :to="{ name: child.name }">
                <a-icon :type="child.meta.icon" />
                <span>{{ child.meta.title }}</span>
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: 'MenuArea',
  computed: {
    defaultSelectKey() {
      return this.$router.currentRoute.matched[1] ? this.$router.currentRoute.matched[1].name : '';
    },
    defaultOpenKey() {
      return this.$router.currentRoute.matched[0].name;
    },
  },
  methods: {},
};
</script>
