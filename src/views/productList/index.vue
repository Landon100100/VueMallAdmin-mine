<template>
  <div class="product-list-container">
    <div class="search-box">
      <a-form-model
        ref="ruleFormRef"
        :model="formInline"
        v-bind="formItemLayout"
        layout="inline"
        class="search-inline-box"
        @submit="search"
        @submit.native.prevent
      >
        <a-form-model-item label="检索关键字">
          <a-input v-model="formInline.searchWord" placeholder="请输入关键字"> </a-input>
        </a-form-model-item>
        <a-form-model-item label="商品类目">
          <a-select
            show-search
            v-model="formInline.category"
            allowClear
            placeholder="请选择商品类目"
            :default-active-first-option="false"
            style="width: 200px"
            show-arrow
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch"
            @change="handleChange"
          >
            <a-select-option v-for="o in optionList" :key="o.id">
              {{ o.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
        >
          <a-button type="primary" html-type="submit"> 搜索 </a-button>
        </a-form-model-item>
      </a-form-model>
      <a-button class="btn-right" type="info" @click="productAdd">添加商品</a-button>
    </div>
    <a-table
      :columns="columns"
      class="table-wrapper"
      row-key="id"
      :data-source="data"
      :pagination="pagination"
      @change="tableChange"
    >
      <a slot="action" slot-scope="text, record">
        <a-button type="primary" @click="editHandle(record)">编辑</a-button>
        <a-button type="danger" class="btn-handle2" @click="deleteHandle(record)">删除</a-button>
      </a>
    </a-table>
  </div>
</template>

<script>
import { getProductList, deleteProduct } from '@/api/product';
import { getCategoryList } from '@/api/category';

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16, offset: 1 },
};
const formTailLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16, offset: 7 },
};
const columns = [
  {
    title: 'ID',
    width: 100,
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
  },
  // 注意转换数组为字符串 xx1,xx2
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    customRender(text) {
      return text.join('，');
    },
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
  },
  // 映射数字为对应的状态
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    fixed: 'right',
    width: 180,
    scopedSlots: { customRender: 'action' },
  },
];
export default {
  name: 'ProductList',
  data() {
    return {
      formItemLayout,
      formTailLayout,
      formInline: {
        searchWord: '',
        category: undefined,
      },
      data: [
        // {
        //   tags: [],
        //   inventory: 0,
        //   status: 1,
        //   id: 1,
        //   title: "",
        //   price: 0,
        //   price_off: 0,
        //   desc: "",
        //   category: 1,
        //   c_item: "",
        // },
      ],
      columns,
      optionList: [],
      categoryObj: {},
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
      },
    };
  },
  created() {
    this.handleSearch();
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData(
      current = this.pagination.current,
      pageSize = this.pagination.pageSize,
      searchWord = '',
      category = '',
    ) {
      const resp = await getProductList(current, pageSize, searchWord, category);
      // this.data = resp.data;
      this.data = resp.data.map((item) => ({
        ...item,
        categoryName: this.categoryObj[item.category]?.name,
      }));
      this.pagination.total = resp.total;
    },
    tableChange(pagination) {
      this.pagination = pagination;
      this.fetchData(
        this.pagination.current,
        this.pagination.pageSize,
        this.formInline.searchWord,
        this.formInline.category,
      );
    },
    // eslint-disable-next-line no-unused-vars
    handleChange(pagination, filters, sorter) {},
    // eslint-disable-next-line no-unused-vars
    async handleSearch(value) {
      const resp = await getCategoryList();
      this.optionList = resp.data;
      resp.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    },
    // eslint-disable-next-line no-unused-vars
    search(record) {
      this.pagination.current = 1;
      this.fetchData(
        this.pagination.current,
        this.pagination.pageSize,
        this.formInline.searchWord,
        this.formInline.category,
      );
    },
    editHandle(record) {
      // this.$router.push(`/product/edit/${record.id}`);
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    deleteHandle(record) {
      // 在 $confirm 中，onOK调用不到this。
      // 方法1： 调用this.方法 或 this.属性 前需要提前用 that 保存
      // const that = this;
      this.$confirm({
        title: '确认删除',
        content: `确认删除${record.title}？`,
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        /* onOk() {
          deleteProduct(record.id).then(() => {
            if (
              that.pagination.total % that.pagination.pageSize === 1
              && that.pagination.total > 1
            ) {
              that.pagination.current -= 1;
            }
            that.fetchData(that.pagination.current, that.pagination.pageSize);
          });
        }, */
        // 方法2：onOK改为箭头函数
        onOk: () => {
          deleteProduct(record.id).then(() => {
            if (
              this.pagination.total % this.pagination.pageSize === 1
              && this.pagination.total > 1
            ) {
              this.pagination.current -= 1;
            }
            this.fetchData(this.pagination.current, this.pagination.pageSize);
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    productAdd() {
      this.$router.push({ name: 'ProductAdd' });
    },
  },
};
</script>

<style scoped lang="less">
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  .search-inline-box {
    padding-left: 20px;
  }
  .btn-right {
    margin-right: 20px;
  }
}
.table-wrapper {
  margin-top: 15px;
  .btn-handle2 {
    margin-left: 15px;
  }
  ::v-deep .ant-pagination {
    margin-right: 15px;
  }
}
</style>
