import Cookies from 'js-cookie';
// 本项目的userInfo信息采用Cookie储存
/**
 * 设置cooike
 * @param {Object} info
 */
export function setCookie(info) {
  const arr = Object.entries(info);
  for (let i = 0; i < arr.length; i += 1) {
    Cookies.set(arr[i][0], arr[i][1]);
  }
  return true;
}

/**
 *
 * @returns 获取用户的cookie信息
 */
export function getUserCookie() {
  return {
    email: Cookies.get('email'),
    username: Cookies.get('username'),
    appkey: Cookies.get('appkey'),
    role: Cookies.get('role'),
  };
}

/**
 * 移除cookie
 */
export function removeUserCookie() {
  Cookies.remove('email');
  Cookies.remove('username');
  Cookies.remove('appkey');
  Cookies.remove('role');
  return true;
}
