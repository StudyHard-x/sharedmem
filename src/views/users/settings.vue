<!--
* @FileDescription: home page
* @Author: Chuheng Xiang
* @Student number: 2750443X
* @LastEditors: Chuheng Xiang
-->

<template>
  <div>
    <el-container class="index-con">
        <el-header class="index-header">
          <navcon></navcon>
        </el-header>
        <el-main clss="index-main">
          <span class="trust_email_span">
            Trust Email:
          </span>
          <el-table size="large" :data="listData" highlight-current-row v-loading="loading" element-loading-text="loading" style="width: 100%;font-size: 18px">
            <el-table-column align="center" width="60">
            </el-table-column>
            <el-table-column sortable prop="username" label="Name" width="280">
            </el-table-column>
            <el-table-column sortable prop="email" label="Email" width="780">
            </el-table-column>
            <el-table-column align="center" label="operation" min-width="300">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">edit</el-button>
                <el-button size="mini" type="danger" @click="handleDelet(scope.$index, scope.row)">delete</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-button type="success" @click="addNew()">Add</el-button>
          </div>
        </el-main>
    </el-container>
  </div>
</template>
<script>
  // 导入组
import navcon from "../../components/navcon";
  import {getTrustEmail, userRigster} from "../../api/userMG";
  import {Message} from "element-ui";

  export default {
    name: 'homepage',
    data() {
      return {
        loading: false,
        form:{
          id : 0,
        },
        path:'',
        listData:[
          {username: 'user_01', email: 'user_01@gmail.com',},
          {username: 'user_02', email: 'user_02@gmail.com',}
        ]
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
      AddNew(){

      },
      getInfo(){
        console.log(this.form.id)
        getTrustEmail('id', this.form.id)
          .then(res => {
            console.log('res: ',res)
            if (res.code == 2) {
              // Message({
              //   type: 'info',
              //   message : res.msg
              // })
            } else {
              // Message({
              //   type: 'success',
              //   message: 'register success'
              // })
              // setTimeout(() => {
              //   this.$router.push({ path: '/' })
              // },1000)
            }
          })
          .catch(err => {
            this.$message.error('fail')
          })
      }
    },
    created() {
      this.form.id = JSON.parse(localStorage.getItem('userData')).id
      this.getInfo()

    },
    beforeUpdate() {},
    beforeMount() {

    }
  }
</script>

<style scoped>
.trust_email_span{
  font-size: 30px;
  font-weight: bold;
}
</style>

