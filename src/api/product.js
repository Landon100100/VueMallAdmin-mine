import request from './request';

/**
 * 查询产品列表
 * @param {Number} page 获取产品的页码 非必须
 * @param {Number} size 获取产品每一页的条数 非必须
 * @param {String} searchWord 检索产品的关键词 非必须
 * @param {Number} category 产品类目 非必须
 * @param {String} appkey 拦截器中已添加 必须
 * @returns
 */
export function getProductList(page = 1, size = 10, searchWord = '', category = '') {
  return request.get('/products/all', {
    params: {
      size,
      page,
      searchWord,
      category,
    },
  });
}

/**
 * 新增产品
 * @param {*} data
 * | appkey    | String | 必须   | 用户访问接口时所必须携带的身份凭证 |
| --------- | ------ | ------ | ---------------------------------- |
| title     | String | 必须   | 商品标题                           |
| desc      | String | 非必须 | 商品描述                           |
| category  | Number | 必须   | 商品类目                           |
| c_items   | Array  | 非必须 | 商品子类目                         |
| tags      | Array  | 必须   | 商品标签                           |
| price     | Number | 必须   | 商品价格                           |
| price_off | Number | 必须   | 商品折扣价                         |
| unit      | String | 必须   | 商品单位                           |
| status    | Int    | 必须   | 商品上架状态 0 是下架 ，1 是上架   |
| images    | Array  | 必须   | 商品图片                           |
 * @returns
*/
export function addProduct(data) {
  return request.post('/products/add', data);
}

/**
 * 编辑产品
 * @param {*} data
 * | 字段      | 类型   | 是否必须 | 备注                               |
| --------- | ------ | -------- | ---------------------------------- |
| appkey    | String | 必须     | 用户访问接口时所必须携带的身份凭证 |
| title     | String | 必须     | 商品标题                           |
| desc      | String | 非必须   | 商品描述                           |
| category  | Number | 必须     | 商品类目                           |
| c_items   | Array  | 非必须   | 商品子类目                         |
| tags      | Array  | 必须     | 商品标签                           |
| price     | Number | 必须     | 商品价格                           |
| price_off | Number | 必须     | 商品折扣价                         |
| unit      | String | 必须     | 商品单位                           |
| status    | Int    | 必须     | 商品上架状态 0 是下架 ，1 是上架   |
| images    | Array  | 必须     | 商品图片                           |
| inventory | Int    | 必须     | 商品库存量                         |
| sale      | Int    | 必须     | 商品销量                           |
| _id       | String | 必须     | 唯一确定商品的 id 值               |
 * @returns
 */
export function editProduct(data) {
  return request.put('/products/edit', data);
}

/**
 * 上传图片
 * @param {*} avatar 上传的文件
 * @returns
 */
export function uploadImages(avatar) {
  return request.post('/upload/images', {
    data: {
      avatar,
      // appkey,
    },
  });
}

/**
 * 查询商品详情
 * @param {*} id
 * @returns
 */
export function getProductDetail(id) {
  return request.get(`/products/${id}`);
}

/**
 * 删除商品
 * @param {*} id
 * @returns
 */

export function deleteProduct(id) {
  return request.delete(`/products/${id}`);
}
