<!--
* @FileDescription: user profile
* @Author: Chuheng Xiang
* @Student number: 2750443X
-->
<template>
    <div class="forget_div">
      <el-container>
        <el-header>
          <router-link to="/">

          </router-link>

        </el-header>
        <el-main class="forget_main">
<!--          <el-table style="width: 100%" border :data="tableData">-->
<!--            <template v-for="(item,index) in tableHead">-->
<!--              <el-table-column :prop="item.column_name" :label="item.column_comment" :key="index" v-if="item.column_name != 'id'"></el-table-column>-->
<!--            </template>-->
<!--          </el-table>-->
          <el-table
            :data="tableData"
            border
            style="width: 100%; font-size: 20px"
          >
            <el-table-column
              v-for="(column, index) in columns"
              :key="index"
              :prop="column.prop"
              :label="column.label"
              :width="column.width"
            >
            </el-table-column>

            <el-table-column
              fixed="right"
              label="operation"
            >
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="success">Send Email</el-button>
<!--                <el-button type="text" size="small">编辑</el-button>-->
              </template>
            </el-table-column>
          </el-table>

        </el-main>
      </el-container>
    </div>
</template>
<script>
  // 导入组件
  import { Message } from "element-ui";
  export default {
    name: 'forget',
    data() {
      return {
        data: [],
        columns: [ // 确保你在 data 中定义了 columns
          { prop: 'username', label: 'Name', width: '350' },
          { prop: 'email', label: 'Email', width: '750' },
          // 其他列配置
        ],
        tableData: [
          {username: 'user_01', email: 'user_01@gmail.com',},
          {username: 'user_02', email: 'user_02@gmail.com',}
        ]
        ,
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


      // this.data = JSON.parse(localStorage.getItem("userData"))
      // console.log(this.data)
    },
    beforeUpdate() {},
    beforeMount() {

    }
  }
</script>

<style scoped>
  .forget_div{
    padding: 0px;
    margin: 0px;
    height: 100%;
  }
  .el-header, .el-footer {
    /*border: 10px solid #c0c4cc !important;*/
    background-color: #ececec;
    color: #333;
    /*text-align: center;*/
    line-height: 50px;
  }
  /*.el-main {*/
  /*  background-color: #f6f6f6;*/
  /*  color: #333;*/
  /*  text-align: center;*/
  /*  !*line-height: 20px;*!*/
  /*}*/

</style>

