<template>
  <div class="product-container">
    <a-steps class="step-box" :current="step">
      <a-step>
        <template slot="title"> 填写商品基本信息 </template>
      </a-step>
      <a-step title="填写商品销售信息" />
    </a-steps>
    <div class="form-box">
      <!-- @submit="confirmHandle" -->
      <a-form-model
        ref="ruleFormRef"
        :model="editForm"
        :rules="rules"
        v-bind="formItemLayout"
        class="search-inline-box"
        @submit="editSubmit"
        @submit.native.prevent
      >
        <a-form-model-item v-if="step === 0" label="标题" prop="title">
          <a-input v-model="editForm.title" placeholder="请输入标题"> </a-input>
        </a-form-model-item>
        <a-form-model-item v-if="step === 0" label="商品描述" prop="desc">
          <a-input v-model="editForm.desc" placeholder="请输入商品描述"> </a-input>
        </a-form-model-item>
        <a-form-model-item v-if="step === 0" label="商品类目" prop="category">
          <a-select
            v-model="editForm.category"
            placeholder="请选择商品类目"
            :default-active-first-option="false"
            show-arrow
            :filter-option="false"
            :not-found-content="null"
            @search="handleSearch"
            @change="handleChange"
          >
            <a-select-option v-for="cate in categoryList" :key="cate.id">
              {{ cate.name }}
            </a-select-option>
          </a-select>
          <!-- @search="handleCItemSearch" -->
          <a-select
            v-model="editForm.c_item"
            allowClear
            placeholder="请选择商品子类目"
            :default-active-first-option="false"
            show-arrow
            :filter-option="false"
            @change="handleCItemChange"
          >
            <a-select-option v-for="cItem in cItemList" :key="cItem">
              {{ cItem }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item v-if="step === 0" label="商品标签" prop="tags">
          <!-- show-search -->
          <a-select
            mode="tags"
            v-model="editForm.tags"
            placeholder="请选择商品标签"
            :default-value="['包邮，最晚次日达']"
            :default-active-first-option="true"
            show-arrow
            :filter-option="false"
            :not-found-content="null"
            @search="handleTagsSearch"
            @change="handleTagsChange"
          >
            <a-select-option
              v-if="tagList.indexOf('包邮，最晚次日达') === -1"
              value="包邮，最晚次日达"
            >
              包邮，最晚次日达
            </a-select-option>
            <a-select-option v-for="t in tagList" :key="t">
              {{ t }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item v-if="step === 1" label="商品售价" prop="price">
          <a-input-number
            v-model.number="editForm.price"
            placeholder="请输入商品售价"
            class="input-number-box input-number-handler-disable"
            :min="0.01"
            :precision="2"
          />
        </a-form-model-item>
        <a-form-model-item v-if="step === 1" label="折扣价格" prop="price_off">
          <a-input-number
            v-model.number="editForm.price_off"
            placeholder="请输入折扣价格"
            class="input-number-box input-number-handler-disable"
            :min="0.01"
            :precision="2"
          />
        </a-form-model-item>
        <a-form-model-item v-if="step === 1" label="商品库存" prop="inventory">
          <a-input-number
            v-model.number="editForm.inventory"
            placeholder="请输入商品库存"
            class="input-number-box"
            :min="0"
            :precision="0"
          />
        </a-form-model-item>
        <a-form-model-item v-if="step === 1" label="计量单位" prop="unit">
          <a-input v-model="editForm.unit" placeholder="请输入计量单位"> </a-input>
        </a-form-model-item>
        <!-- 需将数据改为 ant-design 对应的结构 -->
        <a-form-model-item v-if="step === 1" label="商品相册" prop="images">
          <!-- https://mallapi.duyiedu.com/upload/images?appkey= -->
          <!-- name 发到后台的文件参数名 -->
          <a-upload
            :action="
              'https://mallapi.duyiedu.com/upload/images?appkey=' + $store.getters.user.appkey
            "
            list-type="picture-card"
            :file-list="fileList"
            @preview="handlePreview"
            @change="handleImageChange"
            name="avatar"
          >
            <div v-if="fileList.length < 8">
              <!-- <a-icon type="plus" /> -->
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleImageClose">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-form-model-item>
        <a-form-model-item
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
        >
          <!-- html-type="submit" -->
          <a-button type="info" v-if="step > 0" @click="prev"> 上一步 </a-button>
          <a-button type="primary" v-if="step < 1" @click="next"> 下一步 </a-button>
          <!-- <a-button type="primary" v-if="step > 0" class="btn-right" @click="editSubmit">
            提交
          </a-button> -->
          <a-button type="primary" v-if="step > 0" class="btn-right" html-type="submit">
            提交
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { getProductDetail, editProduct, addProduct } from '@/api/product';
import { getCategoryList } from '@/api/category';

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 16, offset: 1 },
};
const formTailLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16, offset: 8 },
};
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  name: 'Product',
  props: {
    mode: {
      type: String,
      default: 'edit',
    },
  },
  data() {
    const uploadImageValidate = (rule, value, callback) => {
      if (value.length === 0) {
        return callback(new Error('请选择需要上传的图片'));
      }
      callback();
      return true;
    };
    return {
      step: 0,
      formItemLayout,
      formTailLayout,
      editForm: {
        tags: [],
        images: [],
        unit: '',
        inventory: '',
        status: 1,
        sale: '',
        id: '',
        title: '',
        price: '',
        price_off: '',
        desc: '',
        category: undefined,
        c_item: undefined,
        _id: '',
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        desc: [],
        category: [{ required: true, message: '请选择商品类目', trigger: 'change' }],
        c_item: [],
        tags: [
          {
            // type: "array",
            required: true,
            message: '请选择商品标签',
            trigger: 'change',
          },
        ],
        price: [
          {
            type: 'number',
            required: true,
            message: '请输入商品售价',
            trigger: 'blur',
          },
          {
            type: 'number',
            min: 0.01,
            message: '商品售价不合法',
            trigger: 'blur',
          },
        ],
        price_off: [
          {
            type: 'number',
            min: 0.01,
            message: '商品折扣不合法',
            trigger: 'blur',
          },
        ],
        inventory: [
          {
            type: 'number',
            required: true,
            message: '请输入商品库存',
            trigger: 'blur',
          },
          {
            type: 'number',
            min: 0,
            message: '商品库存不能小于0',
            trigger: 'blur',
          },
        ],
        unit: [{ required: true, message: '请输入计量单位', trigger: 'blur' }],
        images: [
          {
            type: 'array',
            required: true,
            validator: uploadImageValidate,
            // message: "请上传商品相册",
            trigger: 'change',
          },
        ],
      },
      categoryList: [],
      cItemList: [],
      tagList: [],
      categoryObj: {},
      cate: '',
      fileList: [],
      loading: false,
      previewVisible: false,
      previewImage: '',
    };
  },
  created() {
    this.handleSearch();
  },
  mounted() {
    if (this.mode === 'edit') {
      this.fetchData().then(() => {
        this.fileList = this.editForm.images.map((item, index) => {
          const matched = item.match(/:\/\/(.*)/);
          let name;
          if (matched) {
            name = `/${matched[1]}`;
          }
          return {
            uid: index,
            // name: `image-${index}.png`,
            name,
            status: 'done',
            url: item,
          };
        });
      });
    }
  },
  methods: {
    async fetchData() {
      const resp = await getProductDetail(this.$route.params.id);
      // 需要拼接数据
      this.editForm = resp;
      this.tagList = resp.tags;
      this.cate = this.editForm.category;
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === this.cate) {
          this.cItemList = this.categoryList[i].c_items;
        }
      }
    },
    handleChange(pagination) {
      this.cate = pagination;
      this.editForm.c_item = undefined;
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === pagination) {
          this.cItemList = this.categoryList[i].c_items;
        }
      }
    },
    // eslint-disable-next-line no-unused-vars
    async handleSearch(value) {
      const resp = await getCategoryList();
      this.categoryList = resp.data;
      resp.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    },
    // eslint-disable-next-line no-unused-vars
    handleCItemChange(pagination) {},
    // eslint-disable-next-line no-unused-vars
    handleCItemSearch(value) {},
    // eslint-disable-next-line no-unused-vars
    handleTagsChange(pagination) {},
    // eslint-disable-next-line no-unused-vars
    handleTagsSearch(value) {},
    // eslint-disable-next-line no-unused-vars
    search(record) {
      this.pagination.current = 1;
      // this.fetchData(
      //   this.pagination.current,
      //   this.pagination.pageSize,
      //   this.formInline.searchWord,
      //   this.formInline.category
      // );
      this.fetchData();
    },
    next() {
      // eslint-disable-next-line
      this.$refs.ruleFormRef.validate((valid) => {
        if (!valid) {
          return false;
        }
        if (valid) {
          if (this.step === 0) {
            this.step += 1;
          }
        }
      });
    },
    prev() {
      if (this.step > 0) {
        this.step -= 1;
        this.$refs.ruleFormRef.resetFields();
      }
    },
    handleImageClose() {
      this.previewVisible = false;
    },
    // 图片预览
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleImageChange({ file, fileList }) {
      if (file.status === 'done') {
        this.editForm.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        // const { url } = file.response.data;
        // const { url } = file;
        // 当你删除一个图片时，如果是本次上传后删除的，this.editForm.images过滤掉file.response.data.url。如果是之前上传的，过滤掉 file.url
        const url = file.response ? file.response.data.url : file.url;
        this.editForm.images = this.editForm.images.filter((item) => item !== url);
      }
      this.fileList = fileList;
    },
    // confirmHandle(record) {},
    editSubmit() {
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (valid) {
          if (this.mode === 'edit') {
            await editProduct(this.editForm);
            this.$router.push({ name: 'ProductList' });
          } else if (this.mode === 'add') {
            await addProduct(this.editForm);
            this.$router.push({ name: 'ProductList' });
          }
          return true;
        }
        return false;
      });
    },
  },
};
</script>

<style scoped lang="less">
.step-box {
  width: 50%;
  margin: 15px auto;
}
.form-box {
  width: 60%;
  min-width: 500px;
  margin: 0 auto;
  .input-number-box {
    width: 100%;
  }
  .input-number-handler-disable ::v-deep .ant-input-number-handler-wrap {
    display: none;
  }
  .btn-right {
    margin-left: 15px;
  }
}
</style>

<style lang="less">
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
