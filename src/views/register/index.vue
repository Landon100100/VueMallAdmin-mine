<template>
  <div class="login-regi-container regi-container">
    <a-form-model
      ref="ruleFormRef"
      :model="formInline"
      v-bind="formItemLayout"
      :rules="rules"
      class="login-regi-box"
      @submit="registerUser"
      @submit.native.prevent
    >
      <a-form-model-item label="用户名" prop="username">
        <a-input v-model="formInline.username" placeholder="请输入用户名">
          <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="邮箱" prop="email">
        <a-input v-model="formInline.email" placeholder="请输入邮箱">
          <a-icon slot="prefix" type="mail" style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password">
        <a-input v-model="formInline.password" type="password" placeholder="请输入密码">
          <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="确认密码" prop="rePassword">
        <a-input v-model="formInline.rePassword" type="password" placeholder="请再次输入密码">
          <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="验证码" prop="code">
        <a-input v-model="formInline.code" placeholder="请输入验证码">
          <a-icon slot="prefix" type="file-text" style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item
        :label-col="formTailLayout.labelCol"
        :wrapper-col="formTailLayout.wrapperCol"
      >
        <a-button type="primary" html-type="submit"> 注册 </a-button>
        <a-button type="info" class="btn-info" @click="getCode"> 获取验证码 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { getCode, register } from '@/api/loginRegi';

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
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.formInline.rePassword !== '') {
          this.$refs.ruleFormRef.validateField('rePassword');
        }
        callback();
      }
    };
    const validateRePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formInline.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      formItemLayout,
      formTailLayout,
      formInline: {
        username: '',
        email: '',
        password: '',
        rePassword: '',
        code: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            type: 'email',
            message: '邮箱格式不正确',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码至少为6位', trigger: 'blur' },
          { validator: validatePassword, trigger: 'change' },
        ],
        rePassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validateRePassword, trigger: 'change' },
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
    };
  },
  methods: {
    getCode() {
      this.$refs.ruleFormRef.validateField('email', async (error) => {
        if (!error) {
          try {
            const resp = await getCode({ email: this.formInline.email });
            /* if (resp.status === "success") {
              this.$message.success(resp.msg);
            } else {
              this.$message.error(resp.msg);
            } */
            this.$message.success(resp);
          } catch (err) {
            this.$message.error(err);
          }
        }
      });
    },
    registerUser() {
      // eslint-disable-next-line consistent-return
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (valid) {
          /* const resp = await register(this.formInline);
          if (resp.status === "success") {
            this.$router.push("/login");
          } else {
            this.$message.error(resp.msg);
            this.$router.push("/login");
          } */
          try {
            await register(this.formInline);
            this.$router.push('/login');
            return true;
          } catch (err) {
            this.$message.error(err);
            this.$router.push('/login');
          }
        } else {
          return false;
        }
      });
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
  height: 500px;
  border: 1px solid #eee;
  margin: 50px auto 0;
  &.regi-container {
    height: 500px;
  }
  .login-regi-box {
    min-width: 400px;
  }
  .btn-info {
    margin-left: 15px;
  }
}
</style>
