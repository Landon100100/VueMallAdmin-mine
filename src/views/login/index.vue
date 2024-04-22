<template>
  <div class="login-regi-container">
    <a-form-model
      ref="ruleFormRef"
      :model="formInline"
      v-bind="formItemLayout"
      :rules="rules"
      class="login-regi-box"
      @submit="login"
      @submit.native.prevent
    >
      <a-form-model-item label="邮箱" prop="email">
        <a-input v-model="formInline.email" placeholder="请输入邮箱">
          <a-icon slot="prefix" type="mail" style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
        <!-- <a-select
          show-search
          v-model="formInline.email"
          placeholder="请输入邮箱"
          style="width: 200px"
          :default-active-first-option="false"
          :show-arrow="false"
          :filter-option="false"
          :not-found-content="null"
          @search="handleSearch"
          @change="handleChange"
        >
          <a-select-option v-for="d in data" :key="d.value">
            <a-icon slot="prefix" type="mail" style="color: rgba(0, 0, 0, 0.25)" />
            {{ d.text }}
          </a-select-option>
        </a-select> -->
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password">
        <a-input v-model="formInline.password" type="password" placeholder="请输入密码">
          <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item
        :label-col="formTailLayout.labelCol"
        :wrapper-col="formTailLayout.wrapperCol"
      >
        <a-button type="primary" html-type="submit"> 登录 </a-button>
        <a-button type="info" class="btn-info" @click="toRegi"> 注册 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { login } from '@/api/loginRegi';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16, offset: 1 },
};
const formTailLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16, offset: 7 },
};
export default {
  name: 'login',
  data() {
    // const emailArray = ["163.com", "126.com", "gmail.com", "qq.com", "outlook.com"];
    // let timeout;
    // let currentValue;

    // function fetch(value, callback) {
    //   if (timeout) {
    //     clearTimeout(timeout);
    //     timeout = null;
    //   }
    //   console.log(currentValue, "fetch");
    //   currentValue = value;

    //   /* function fake() {
    //     const str = querystring.encode({
    //       code: "utf-8",
    //       q: value,
    //     });
    //     jsonp(`https://suggest.taobao.com/sug?${str}`)
    //       .then((response) => response.json())
    //       .then((d) => {
    //         if (currentValue === value) {
    //           const { result } = d;
    //           const data = [];
    //           result.forEach((r) => {
    //             data.push({
    //               value: r[0],
    //               text: r[0],
    //             });
    //           });
    //           callback(data);
    //         }
    //       });
    //   } */

    //   function fake() {
    //     return new Promise((resolve) => {
    //       const arr = emailArray.map((item) => `${currentValue}@${item}`);
    //       callback(arr);
    //       resolve(arr);
    //     });
    //   }

    //   timeout = setTimeout(fake, 300);
    // }
    return {
      formItemLayout,
      formTailLayout,
      formInline: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            type: 'email',
            message: '邮箱格式不正确',
          },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      // data: [],
    };
  },
  methods: {
    // handleSearch(value) {
    //   fetch(value, (data) => (this.data = data));
    //   // fetch(value);
    // },
    // handleChange(value) {
    //   this.value = value;
    //   fetch(value, (data) => (this.data = data));
    //   // fetch(value);
    // },
    login() {
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (valid) {
          try {
            const resp = await login(this.formInline);
            this.$store.dispatch('user/updateUserInfo', resp);
            this.$router.push('/');
            return true;
          } catch (error) {
            this.$message.error(error);
            return Promise.reject(error);
          }
        } else {
          return false;
        }
      });
    },
    toRegi() {
      this.$router.push('/register');
    },
  },
};
</script>

<style lang="less">
.login-regi-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 300px;
  border: 1px solid #eee;
  margin: 50px auto 0;
  .login-regi-box {
    min-width: 400px;
  }
  .btn-info {
    margin-left: 15px;
  }
}
</style>
