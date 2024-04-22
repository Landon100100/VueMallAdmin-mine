<template>
  <div class="category-list-container">
    <div class="top-box">
      <a-button class="btn-right" type="info" @click="categoryAdd">新增</a-button>
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
    <!-- 新增/编辑弹框 -->
    <a-modal
      v-model="visible"
      :title="title"
      :maskClosable="false"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <!-- 表单内容 -->
      <a-form-model ref="ruleFormRef" :model="form" :rules="rules" v-bind="formItemLayout">
        <a-form-model-item label="标签ID" prop="id">
          <a-input v-model="form.id" placeholder="请输入标签ID" :disabled="idDisabled" />
        </a-form-model-item>
        <a-form-model-item label="标签名称" prop="name">
          <a-input v-model="form.name" placeholder="请输入标签名称" />
        </a-form-model-item>
        <a-form-model-item label="所属子类别" prop="c_items">
          <a-select
            mode="tags"
            v-model="form.c_items"
            allowClear
            placeholder="请输入所属子类别"
            :filter-option="false"
            @change="handleCItemChange"
          >
            <a-select-option v-for="cItem in cItemList" :key="cItem">
              {{ cItem }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
      <template #footer>
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleOk">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import {
  getCategoryList, addCategory, editCategory, deleteCategory,
} from '@/api/category';

const columns = [
  {
    title: 'id',
    width: 100,
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    // width: 300,
    scopedSlots: { customRender: 'action' },
  },
];
const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16, offset: 1 },
};
export default {
  name: 'Category',
  data() {
    return {
      data: [],
      columns,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
      },
      visible: false,
      mode: 'edit',
      form: {
        id: '',
        name: '',
        c_items: [],
      },
      rules: {
        id: [{ required: true, message: '请输入标签ID', trigger: 'blur' }],
        name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }],
        c_items: [
          {
            type: 'array',
            required: true,
            message: '请输入所属子类别',
            trigger: 'change',
          },
        ],
      },
      formItemLayout,
      cItemList: [],
    };
  },
  computed: {
    idDisabled() {
      // eslint-disable-next-line
      return this.mode === "edit" ? true : false;
    },
    title() {
      return this.mode === 'edit' ? '编辑标签' : '新增标签';
    },
  },
  created() {},
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData(current = this.pagination.current, pageSize = this.pagination.pageSize) {
      const resp = await getCategoryList(current, pageSize);
      this.data = resp.data;
      this.pagination.total = resp.total;
    },
    tableChange(pagination) {
      this.pagination = pagination;
      this.fetchData(this.pagination.current, this.pagination.pageSize);
    },
    editHandle(record) {
      this.mode = 'edit';
      this.visible = true;
      this.form = JSON.parse(JSON.stringify(record));
    },
    deleteHandle(record) {
      // 在 $confirm 中，调用 this.方法 或 this.属性 前需要提前用 that 保存
      const that = this;
      this.$confirm({
        title: '确认删除',
        content: `确认删除${record.name}？`,
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          deleteCategory(record.id).then(() => {
            if (
              that.pagination.total % that.pagination.pageSize === 1
              && that.pagination.total > 1
            ) {
              that.pagination.current -= 1;
            }
            that.$message.success('删除成功');
            that.fetchData(that.pagination.current, that.pagination.pageSize);
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    categoryAdd() {
      this.mode = 'add';
      this.visible = true;
    },
    // eslint-disable-next-line no-unused-vars
    handleCItemChange(pagination) {},
    handleOk() {
      // 处理表单提交逻辑
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (valid) {
          if (this.mode === 'edit') {
            await editCategory(this.form);
            this.visible = false;
            this.$message.success('修改成功');
            this.resetForm();
            this.fetchData();
          } else if (this.mode === 'add') {
            try {
              await addCategory(this.form);
              this.visible = false;
              this.$message.success('新增成功');
              this.resetForm();
              this.fetchData();
            } catch (error) {
              this.$message.error(error);
            }
          }
        }
        return false;
      });
    },
    resetForm() {
      this.form = {
        id: '',
        name: '',
        c_items: [],
      };
    },
    handleCancel() {
      this.resetForm();
      this.visible = false;
    },
  },
};
</script>

<style scoped lang="less">
.top-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 15px;
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
