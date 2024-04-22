<template>
  <div class="slider-nav-container">
    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="$store.state.menu.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <a-breadcrumb v-if="currentRoute.length > 1">
        <a-breadcrumb-item
          >{{ currentRoute[0] ? currentRoute[0].meta.title : "" }}
        </a-breadcrumb-item>
        <a-breadcrumb-item
          ><router-link :to="{ name: currentRoute[1].name }">{{
            currentRoute[1].meta.title
          }}</router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="user-info">
      <li>
        欢迎{{ $store.getters.user.username }}
        <a-icon type="down"></a-icon>
      </li>
      <li @click="logtout">退出</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SliderNav',
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched,
    };
  },
  watch: {
    // 不应该侦听 $router
    // $router: {
    //   handler(nVal, oVal) {
    //     console.log(nVal);
    //   },
    //   deep: true,
    //   // immediate: true,
    // },
    $route: {
      handler(nVal) {
        // $router.currentRoute 相当于 $route
        // this.currentRoute = this.$router.currentRoute.matched;
        this.currentRoute = nVal.matched;
      },
      deep: true,
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('menu/updateCollapsed');
    },
    logtout() {
      this.$store.dispatch('user/removeUserInfo');
      this.$router.push('/login');
    },
  },
};
</script>
