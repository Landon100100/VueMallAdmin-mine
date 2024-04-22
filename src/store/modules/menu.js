export default {
  namespaced: true,
  state: {
    collapsed: false,
  },
  mutations: {
    setCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
  },
  actions: {
    updateCollapsed(ctx) {
      ctx.commit('setCollapsed');
    },
  },
};
