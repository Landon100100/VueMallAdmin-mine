export default {
  namespaced: true,
  state: {
    collapsed: false,
    // 存储菜单的路由
    menuRoutes: [],
  },
  mutations: {
    setCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setMenuRoutes(state, payload) {
      state.menuRoutes = payload;
    },
  },
  actions: {
    updateCollapsed(ctx) {
      ctx.commit('setCollapsed');
    },
    changeMenuRoutes({ commit }, payload) {
      commit('setMenuRoutes', payload);
    },
  },
};
