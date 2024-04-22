import { getUserCookie, setCookie, removeUserCookie } from '@/utils/userCookie';

export default {
  namespaced: true,
  state: {
    userInfo: getUserCookie(),
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    delUserInfo(state) {
      state.userInfo = {
        email: '',
        username: '',
        appkey: '',
        role: '',
      };
    },
  },
  actions: {
    updateUserInfo(ctx, payload) {
      return new Promise((resolve) => {
        ctx.commit('setUserInfo', payload);
        setCookie(payload);
        resolve();
      });
    },
    removeUserInfo(ctx) {
      return new Promise((resolve) => {
        // localStorage.removeItem('userInfo');
        ctx.commit('delUserInfo');
        removeUserCookie();
        resolve();
      });
    },
  },
  getters: {},
};
