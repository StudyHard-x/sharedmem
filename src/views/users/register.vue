<template>
    <div class="register-box">

      <p style="font-weight: bold">admin</p>
      <p>username: admin</p>
      <p>password: 123</p>

      <p style="font-weight: bold">user</p>
      <p>username: mei</p>
      <p>password: 123</p>

      <p>username: mike12</p>
      <p>password: 123</p>

      <p>username: test</p>
      <p>password: 333</p>

<!--      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px">-->
<!--        <el-form-item label="Username" prop="username">-->
<!--          <el-input v-model.number="ruleForm.username"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Account" prop="account">-->
<!--          <el-input v-model.number="ruleForm.account"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Password" prop="password">-->
<!--          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Re-enter password" prop="checkPass">-->
<!--          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="submitForm('ruleForm')">Sign up</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
    </div>
</template>

<script>
    import {userRigster} from "../../api/userMG";

    export default {
      name: "userregister",
      components: {},
      data() {
        const checkName = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('Please enter user name'));
          } else {
            callback();
          }
        };
        const checkAccount = (rule, value, callback) =>{
          if(value===''){
            callback(new Error('Please enter user account'));
          }else {
            callback();
          }
        };
        // var checkAge = (rule, value, callback) => {
        //   if (!value) {
        //     return callback(new Error('年龄不能为空'));
        //   }
        //   setTimeout(() => {
        //     if (!Number.isInteger(value)) {
        //       callback(new Error('请输入数字值'));
        //     } else {
        //       if (value < 18) {
        //         callback(new Error('必须年满18岁'));
        //       } else {
        //         callback();
        //       }
        //     }
        //   }, 1000);
        // };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('Please type your password'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('Type your password again'));
          } else if (value !== this.ruleForm.password) {
            callback(new Error('Passwords do not match!'));
          } else {
            callback();
          }
        };
        return {
          ruleForm: {
            username:'',
            account:'',
            password: '',
            checkPass: '',

            // age: ''
          },
          registerForm:{
            username: '',
            account:'',
            userType: 1,//1:customer 2:operator 3:manager
            note:'',
            gender:'',
            charge: 0,
            status: 0,//0:offline 1:online
          },
          rules: {
            username: [
              {validator: checkName, trigger:'blur'}
            ],
            account:[
              {validator: checkAccount, trigger:'blur'}
            ],
            password: [
              {validator: validatePass, trigger: 'blur'}
            ],
            checkPass: [
              {validator: validatePass2, trigger: 'blur'}
            ],
            // age: [
            //   {validator: checkAge, trigger: 'blur'}
            // ]
          }
        };
      },
      computed: {},
      // 监控data中的数据变化
      watch: {},

      // 方法集合
      methods: {
        submitForm(formName) {
          this.registerForm.account = this.ruleForm.account
          this.registerForm.password = this.ruleForm.password
          this.registerForm.username = this.ruleForm.username
          userRigster(this.registerForm)
            .then(res => {
              if (res) {
                this.$message({
                  type: 'success',
                  message: 'register success'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.$message.error('fail')
            })
        }

      }
    }
</script>

<style scoped>

  /deep/.register-box {
    margin:20px auto;
    text-align: center;
    align: center;
    width: 400px;
  }
</style>

