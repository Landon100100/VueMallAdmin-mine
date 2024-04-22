<template>
  <div class="home">
    <!-- <a-layout id="components-layout-demo-custom-trigger"> -->
    <!-- <div class="left"> -->
    <MenuArea class="left"></MenuArea>
    <!-- </div> -->
    <!-- <MenuArea></MenuArea> -->
    <div class="main-app" :class="{ 'menu-unfold': $store.state.menu.collapsed }">
      <!-- <slot></slot> -->
      <SliderNav></SliderNav>
      <router-view></router-view>
    </div>
    <!-- </a-layout> -->
  </div>
</template>

<script>
import MenuArea from '@/components/MenuArea/index.vue';
import SliderNav from '@/components/SliderNav/index.vue';

export default {
  name: 'Layout',
  components: {
    MenuArea,
    SliderNav,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less">
@import url("~@/assets/styles/home.less");
.layout-container,
.home {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    flex: 0 0 auto;
    overflow: hidden;
    height: 100%;
  }
  .main,
  .main-app {
    flex: 1 1 auto;
    overflow: hidden;
  }
}
</style>
