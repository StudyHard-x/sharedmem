<!--
* @Author: ZiXin Lin
-->

<template>
  <div class="login-box">
    <el-container>
      <el-header>
        <router-link to="/">

        </router-link>

      </el-header>
      <el-main>
        <div class="login-wrap">
          <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm login-container"
          style="width: 350px; height: 370px; margin: 0px auto 0px auto; padding: 30px 35px 15px 35px; opacity: 96%;
              border: 1px solid #eaeaea;
              text-align: left;
              box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);">
            <p>Sign In</p>
            <br>
            <el-form-item prop="username">
              <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="Username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="Password"></el-input>
            </el-form-item>
            <el-row>
            </el-row>
<!--            <span class="forgot" v-model="rememberpwd">forgot password?</span>-->
            <span class="forgot" @click="handleForgotPassword">
            <router-link
              :to="ruleForm.username ? 'users/forget' : '#'"
              :class="{ 'disabled-link': !ruleForm.username }"
              >
            forgot password?
            </router-link>
            </span>
            <el-form-item style="width:100%; padding-top: 20px">
              <el-button type="primary" style="width:100%;" @click="submitForm('ruleForm')" :loading="logining">Sign In</el-button>
            </el-form-item>
            <div class="register-box">
              <div>
            <span style="text-align: center; font-size: 15px;" > Don't have account?
              <router-link to="/users/register">Register here</router-link>
            </span>
              </div>
            </div>
        </el-form>
      </div>
      </el-main>
      <el-footer>
        <el-link type="primary">Help</el-link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-link type="primary">Conditions of Use</el-link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-link type="primary">Privacy Notice</el-link>
        <p>movie-review-website</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import { login,getLoginUser } from '../api/userMG'
  import { getCookie } from '../utils/util'
  import { Message } from 'element-ui'
  export default {
    name: 'login',
    data() {
      return {
        //default login is false
        logining: false,
        // remember password
        rememberpwd: false,
        ruleForm: {
          username: '',
          password: '',
        },
        userType: 1,
        //rules
        rules: {
          username: [{ required: true, message: 'Please enter user name', trigger: 'blur' }],
          password: [{ required: true, message: 'Please enter password', trigger: 'blur' }],
          // code: [{ required: true, message: 'code', trigger: 'blur' }]
        },
        forgetRules:{
          username: [{required: true, message: 'Please enter user name', trigger: 'blur'}]
        }
      }
    },
    // create finish state
    created() {
      Message({
        message: 'username and password can not be empty',
        type: 'success'
      })
      this.getuserpwd()

    },
    methods: {
      handleForgotPassword() {
        if (!this.ruleForm.username) {
          Message({
            showClose: true,
            message: 'Please enter username',
            type: 'error'
          });
        }
      },


      getuserpwd() {
        if (getCookie('user') != '' && getCookie('pwd') != '') {
          this.ruleForm.username = getCookie('user')
          this.ruleForm.password = getCookie('pwd')
          this.rememberpwd = true
        }
      },

      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.logining = true
            login(this.ruleForm).then(res => {
              if (res) {
                console.log(res)
                setTimeout(() => {
                  this.logining = false
                  localStorage.setItem('logintoken', res.data.token)
                  // 缓存用户个人信息
                  getLoginUser(res.data.token).then(resuser =>{
                    console.log('login user:', resuser.data)
                    if(resuser){
                      setTimeout(()=>{
                        // console.log(resuser.data.type)
                        localStorage.setItem('userData',JSON.stringify(resuser.data))
                        this.$store.commit('login', 'true')
                          this.$router.push({ path: '/home' })
                      },1000)
                    }
                  })

                }, 1000)
              } else {
                Message.error(res.msg)
                this.logining = false
                return false
              }
            }).catch(err => {
              Message.error(err.response.data)
              this.logining = false
            })
          } else {
            // this.getcode()
            Message.error('please enter username and password！')
            this.logining = false
            return false
          }
        })
      },
    }
  }
</script>

<style scoped>
  html,
  body,
  #app,
  .el-container,
  .login-box{
    padding: 0px;
    margin: 0px;
    height: 100%;
  }

  .el-header, .el-footer {
    /*border: 10px solid #c0c4cc !important;*/
    background-color: #ececec;
    color: #333;
    text-align: center;
    line-height: 50px;
  }

  .el-footer{
    min-height: 100px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #f6f6f6;
    color: #333;
    text-align: center;
    line-height: 20px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .login-wrap {
    margin-top: 70px;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-position: center right;
  }
  .login-container {
    width: 350px;
    height: 370px;
    margin: 0px auto 0px auto;
    padding: 30px 35px 15px 35px;
    /*background: #fff;*/
    opacity: 96%;
    border: 1px solid #eaeaea;
    text-align: left;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
  }
  .forgot {
    font-size: 4px;
    padding-left: 170px;
    margin: 0px 0px 35px 0px;
  }
  .register-box{
    margin:20px auto;
    text-align: center;
    align: center;
  }
</style>
