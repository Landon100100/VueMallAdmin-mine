import request from './request';

/**
 * 查询类目列表信息
 * @param {Number} page 获取产品的页码 非必须
 * @param {Number} size 获取产品每一页的条数 非必须
 * @param {String} searchWord 检索产品的关键词 非必须
 * @param {String} appkey 拦截器中已添加 必须
 * @returns
 */
export function getCategoryList(page = '', size = '', searchWord = '') {
  return request.get('/category/all', {
    params: {
      size,
      page,
      searchWord,
    },
  });
}

/**
 * 商品类目新增
 * @param {*} data
| 字段    | 类型   | 是否必须 | 备注                               |
| ------- | ------ | -------- | ---------------------------------- |
| appkey  | String | 必须     | 用户访问接口时所必须携带的身份凭证 |
| id      | String | 必须     | 商品类目 id                        |
| name    | String | 必须     | 商品类目名称                       |
| c_items | Array  | 必须     | 商品子类目                         |
 * @returns
*/
export function addCategory(data) {
  // 文档中说使用 GET 方法？待验证。
  // 应该是 POSt 方法
  return request.post('/category/add', data);
}

/**
 * 商品类目编辑
 * @param {*} data
 *
| 字段    | 类型   | 是否必须 | 备注                               |
| ------- | ------ | -------- | ---------------------------------- |
| appkey  | String | 必须     | 用户访问接口时所必须携带的身份凭证 |
| id      | String | 必须     | 商品类目 id                        |
| name    | String | 必须     | 商品类目名称                       |
| c_items | Array  | 必须     | 商品子类目                         |
 * @returns
 */
export function editCategory(data) {
  return request.put('/category/edit', data);
}

/**
 * 商品类目删除
 * @param {*} id
 * @returns
 */

export function deleteCategory(id) {
  return request.delete(`/category/${id}`);
}
