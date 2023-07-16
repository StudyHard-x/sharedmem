<!--
* @FileDescription: user profile
* @Author: Chuheng Xiang
* @Student number: 2750443X
-->
<template>
    <div>



  </div>
</template>
<script>
  // 导入组件
  import { Message } from "element-ui";
  export default {

    name: 'homepage',
    data() {
      return {
        data: [],
      }
    },

    mounted() {
      this.path = this.$route.path;
      // console.log(this.$route.path)
    },
    watch:{
      $route(to,from){
        this.path = to.path
      }
    },
    components: {


    },
    methods: {
    },
    created() {


      this.data = JSON.parse(localStorage.getItem("userData"))
      console.log(this.data)
    },
    beforeUpdate() {},
    beforeMount() {

    }
  }
</script>

<style scoped>
  .profile-footer{
    background: black;
    color: white;
    font-family: Verdana;
    text-align: center;
  }
  .profile-watchlist{
    padding-top: 40px;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.5;
    min-height: 350px;
  }
  .profile-watchlist-font{
    text-align: center;
  }
  .profile-watchlist-font-line{
    line-height: 1;
    font-weight: 500;
    font-size: 15px;
  }
.comment-title{
  font-weight: bold;
  font-size: 20px;
}
.detail-title-font{
    fontSize: 24px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    marginBottom: 16px;
    fontWeight: 500;
}
</style>

