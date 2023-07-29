<template>
    <div class="register-box">

      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px">
        <el-form-item label="Username" prop="username">
          <el-input v-model.number="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Re-enter password" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">Sign up</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    import {userRigster} from "../../api/userMG";
    import {Message} from "element-ui";

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
            callback(new Error('Please enter email'));
          }else {
            callback();
          }
        };
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
            email:'',
            password: '',
            checkPass: '',

            // age: ''
          },
          registerForm:{
            username: '',
            email:'',
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
            email:[
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
          this.$refs[formName].validate(valid => {
            if (valid){
              this.registerForm.email = this.ruleForm.email
              this.registerForm.password = this.ruleForm.password
              this.registerForm.username = this.ruleForm.username
              userRigster(this.registerForm)
                .then(res => {
                  console.log('res: ',res)
                  if (res.code == 2) {
                    Message({
                      type: 'info',
                      message : res.msg
                    })
                  } else {
                    Message({
                      type: 'success',
                      message: 'register success'
                    })
                    setTimeout(() => {
                      this.$router.push({ path: '/' })
                    },1000)
                  }
                })
                .catch(err => {
                  this.$message.error('fail')
                })
            }
          })
        }
        ////
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

