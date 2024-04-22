import axios from 'axios';
import store from '@/store';

const ins = axios.create({
  baseURL: 'https://mallapi.duyiedu.com',
});
ins.interceptors.request.use((config) => {
  if (config.url.includes('/passport')) {
    return config;
  }
  return {
    ...config,
    params: {
      ...config.params,
      appkey: store.getters.user.appkey,
    },
  };
}, (error) => Promise.reject(error));

ins.interceptors.response.use((res) => {
  if (res.data.status === 'fail') {
    return Promise.reject(res.data.msg);
  }
  if (!res.data.data) {
    return res.data.msg;
  }
  return res.data.data;
}, (error) => Promise.reject(error));
export default ins;
