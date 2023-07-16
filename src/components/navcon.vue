<!--
* @Author: ZiXin Lin
-->

<template>
  <el-menu class="el-menu-demo" mode="horizontal" background-color="#334157" text-color="#fff" active-text-color="#fff">
    <el-button class="buttonimg">
<!--      <img class="showimg" :src="collapsed?imgsq:imgshow" @click="toggle(collapsed)">-->
    </el-button>
    <el-submenu index="2" class="submenu">
      <!-- <template slot="title">{{user.userRealName}}</template> -->
      <template slot="title">{{user.username}}</template>
      <el-menu-item index="2-1" @click="setting()">Setting</el-menu-item>
      <el-menu-item @click="content()" index="2-2">Info</el-menu-item>
      <el-menu-item @click="exit()" index="2-3">Sign out</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>

import { loginout } from '../api/userMG'
import {MessageBox, Message} from 'element-ui'
export default {
  name: 'navcon',
  data() {
    return {
      ruleForm: {
        userId : 0,
      },

      collapsed: true,
      imgshow: require('../assets/img/show.png'),
      imgsq: require('../assets/img/sq.png'),
      user: {}
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('userData'))
  },
  methods: {
    setting(){
      this.$router.push({path:'/users/settings'})
    },
    // logout
    exit() {
      MessageBox.confirm('log out?', 'message', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning'
      })
        .then(() => {
          const token = localStorage.getItem("logintoken")
          loginout(token,'token').then(res => {
              if (res) {
                //If the request is successful, let him jump to the route for 2 seconds
                setTimeout(() => {
                  localStorage.removeItem("userData")
                  localStorage.removeItem("logintoken")
                  console.log("test op logout: ", localStorage.getItem("userData"))
                  this.$store.commit('logout', 'false')
                  this.$router.push({ path: '/' })
                  Message({
                    type: 'success',
                    message: 'logout success!'
                  })
                }, 1000)
              } else {
                Message.error(res.msg)
                this.logining = false
                return false
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'logout cancel'
          })
        })
    },
    // 切换显示
    toggle(showtype) {
      this.collapsed = !showtype
      this.$root.Bus.$emit('toggle', this.collapsed)
    }
  }
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
}
.submenu {
  float: right;
}
.buttonimg {
  height: 60px;
  background-color: transparent;
  border: none;
}
.showimg {
  width: 26px;
  height: 26px;
  position: absolute;
  top: 17px;
  left: 17px;
}
.showimg:active {
  border: none;
}
</style>
