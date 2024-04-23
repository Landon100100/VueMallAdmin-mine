<template>
  <div class="home">
    <!-- <a-layout id="components-layout-demo-custom-trigger"> -->
    <!-- key属性的值使用唯一标识，侦听到$route变化时让MenuArea组件重新渲染。 -->
    <!-- 给key赋值当前时间戳new Date().getTime(),，近似于唯一标志。 -->
    <MenuArea class="left" :key="key"></MenuArea>
    <div class="main-app" :class="{ 'menu-unfold': $store.state.menu.collapsed }">
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
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
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
