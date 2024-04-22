import axios from 'axios';

const ins = axios.create({
  baseURL: 'https://mallapi.duyiedu.com',
});
ins.interceptors.request.use((config) => config, (error) => Promise.reject(error));

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
