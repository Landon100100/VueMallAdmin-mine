<template>
  <div class="slider-nav-container">
    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="$store.state.menu.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item><a href="">统计</a></a-breadcrumb-item>
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
      // collapsed: false,
    };
  },
  methods: {
    toggleCollapsed() {
      // this.collapsed = !this.collapsed;
      this.$store.dispatch('menu/updateCollapsed');
    },
    logtout() {
      this.$store.dispatch('user/removeUserInfo');
      this.$router.push('/login');
    },
  },
};
</script>
