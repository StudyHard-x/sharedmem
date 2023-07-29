<!--
* @Author: ZiXin Lin
-->
<template>
  <div>
    <el-container class="index-con">
        <el-header class="index-header">
          <navcon></navcon>
        </el-header>
        <el-main clss="index-main">
        </el-main>
    </el-container>
  </div>
</template>
<script>
  // 导入组
import navcon from "../components/navcon";
import {Message} from "element-ui"

  export default {
    name: 'homepage',
    data() {
      return {
        userInfo :[],
        userGet:{
          userId : 0
        },
        path:'',

      }
    },
    mounted() {
      this.path = this.$route.path;
    },
    watch:{
      $route(to,from){
        this.path = to.path
      }
    },
    components: {
      navcon
    },
    methods: {
    },
    created() {
    },
    beforeUpdate() {},
    beforeMount() {
      // login success
      Message({
        message: 'login success',
        type: 'success'
      })
    }
  }
</script>

<style scoped>
.trust_email_span{
  font-size: 30px;
  font-weight: bold;
}
</style>

