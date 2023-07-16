<!--
* @Author: ZiXin Lin
-->

<template>
  <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b">

    <el-submenu v-if="menu.menurole == userRole" v-for="menu in allmenu" :key="menu.menuid" :index="menu.menuname" >
      <template slot="title">
        <i class="iconfont" :class="menu.icon"></i>
        <span>{{menu.menuname}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.menus" :index="'/'+chmenu.url" :key="chmenu.menuid">
          <i class="iconfont" :class="chmenu.icon"></i>
          <span>{{chmenu.menuname}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>

export default {
  name: 'leftnav',
  data() {
    return {
      collapsed: false,
      allmenu: [],
      userRole: 0,
      userInfo: []
    }
  },

  created() {
    // this.userRole = JSON.parse(localStorage.getItem('userdata')).userType
    this.userRole = localStorage.getItem('userRole')
    console.log('nav: ',  this.userRole)

    let res = {
      success: true,
      data: [
        {
          menuid: 1,
          icon: 'li-icon-xiangmuguanli',
          menuname: 'Management',
          hasThird: null,
          url: null,
          menurole: 0,
          menus: [
            {
              menuid: 2,
              icon: 'li-icon-xiangmuguanli',
              menuname: 'user management',
              hasThird: 'N',
              url: 'operators/track',
              menus: null
            },
            {
              menuid: 3,
              icon: 'li-icon-xiangmuguanli',
              menuname: 'reviews management',
              hasThird: 'N',
              url: 'operators/reviews',
              menus: null
            },
          ]
        },
      ],
      msg: 'success'
    }
          this.allmenu = res.data

    // menu(localStorage.getItem('logintoken'))
    //   .then(res => {
    //     console.log(JSON.stringify(res))
    //     if (res.success) {
    //       this.allmenu = res.data
    //     } else {
    //       this.$message.error(res.msg)
    //       return false
    //     }
    //   })
    //   .catch(err => {
    //     this.$message.error('菜单加载失败，请稍后再试！')
    //   })
    //
    this.$root.Bus.$on('toggle', value => {
      this.collapsed = !value
    })
  }
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}
.logoimg {
  height: 40px;
}
</style>
