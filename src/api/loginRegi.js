import request from './request';

// {"email":"","password":""}
export function login(data) {
  return request.post('/passport/login', data);
}

// {"email":""}
export function getCode(data) {
  return request.post('/passport/getCode', data);
}

// { "username": "", "password": "", "rePassword": "", "code": "", "email": "" }
export function register(data) {
  return request.post('/passport/logon', data);
}
