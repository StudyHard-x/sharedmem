<!--
* @Author: ZiXin Lin
-->

<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>management</el-breadcrumb-item>
      <el-breadcrumb-item>user management</el-breadcrumb-item>
    </el-breadcrumb>

<!--    <el-form :inline="true" :model="formCity" class="user-search">-->
<!--      <el-select ref="selectLocation" v-model="value" placeholder="search">-->
<!--        <el-option-->
<!--          v-for="item in options"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--      <el-form-item>-->
<!--        <el-button size="small" type="primary" icon="el-icon-search" @click="search">search</el-button>-->
<!--&lt;!&ndash;        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">add</el-button>&ndash;&gt;-->
<!--      </el-form-item>-->
<!--    </el-form>-->

    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="loading" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="username" label="User Name" width="180">
      </el-table-column>
<!--      <el-table-column sortable prop="userId" label="User Id" width="150">-->
<!--      </el-table-column>-->
<!--      <el-table-column sortable label="Type" width="150">-->
<!--        <template slot-scope="scope">-->
<!--          <div v-show="scope.row.vehicleType == 1">BIKE</div>-->
<!--          <div v-show="scope.row.vehicleType == 2">SCOOTER</div>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column sortable prop="gender" label="Gender" width="180">
        <template slot-scope="scope">

<!--          <div v-show="scope.row.status == 0">Active</div>-->
          <div v-show="scope.row.gender == 1">female</div>
          <div v-show="scope.row.gender == 2">male</div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="age" label="Age" width="180">
      </el-table-column>
      <el-table-column sortable prop="email" label="Email" width="180">
      </el-table-column>
      <el-table-column sortable prop="activity" label="Activity" width="180">
      </el-table-column>
<!--      <el-table-column sortable prop="editTime" label="time" width="150">-->
<!--        <template slot-scope="scope">-->
<!--          <div>{{scope.row.editTime|timestampToTime}}</div>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column align="center" label="operation" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">edit</el-button>
          <el-button size="mini" type="primary"
                     v-show="scope.row.status == 1" @click="deleteUser(scope.$index, scope.row)">enable</el-button>
          <el-button size="mini" type="danger"
                     v-show="scope.row.status == 0" @click="deleteUser(scope.$index, scope.row)">disable</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Pagination -->
<!--    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>-->
    <!-- eidt page -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="user Id" prop="vehicleId">
          <el-input size="small" v-model="editForm.vehicleId" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="user name" prop="cityId">
          <el-input size="small" v-model="editForm.cityId" auto-complete="off" placeholder="please enter user Id"></el-input>
        </el-form-item>
        <el-form-item label="user email" prop="locationId">
          <el-input size="small" v-model="editForm.locationId" auto-complete="off" placeholder="please enter user Email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">cancel</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">save</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getUserInfo} from '../../api/userMG'
import Pagination from '../../components/Pagination'
import {getAdminInfo} from "../../api/axiosMovie";
export default {
  data() {
    return {
      //search car by city id
      formCity:{
        cityId: 0
      },
      value: '',
      options: [{
        value: 0,
        label: 0
      }, {
        value: 0,
        label: 0
      }
      ],

      // nshow: true, //switch开启
      // fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: 'Add new car',
      editForm: {
        vehicleId: '',
        locationId: '',
        cityId: '',
        // token: localStorage.getItem('logintoken')
      },
      // rules表单验证
      rules: {
        deptName: [
          { required: true, message: 'please enter location', trigger: 'blur' }
        ],
        deptNo: [{ required: true, message: 'please enter plate number', trigger: 'blur' }]
      },
      formInline:{
        id : 0
      },
      // 删除部门
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      userparm: [], //搜索权限
      // user data in list
      listData: [],
      // page
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  // 注册组件
  components: {
    Pagination
  },
  created() {
    // this.getdata(this.formInline)
  },
  methods: {
    // 获取公司列表
    getdata(parameter) {
        getUserInfo()
        .then(res => {
          setTimeout(() => {
            if (res) {
              this.listData = res.data.data
              console.log(this.listData)
            } else {
              this.$message({
                type: 'info',
                message: res.msg
              })
            }
          }, 1000)
            // 分页赋值
            // this.pageparm.currentPage = this.formInline.page
            // this.pageparm.pageSize = this.formInline.limit
            // this.pageparm.total = res.count
            .catch(err => {
              this.loading = false
              this.$message.error('loading failed！')
            })
        })
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
    },
    // search
    search() {

    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = 'edit'
        // console.log(row)
        this.editForm.vehicleId = row.vehicleId
        this.editForm.cityId = row.cityId
        this.editForm.locationId = row.locationId
      } else {
        this.title = 'add'
        this.editForm.deptId = ''
        this.editForm.deptName = ''
        this.editForm.deptNo = ''
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      // this.$refs[editData].validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     editCar(this.editForm)
      //       .then(res => {
      //         this.editFormVisible = false
      //         this.loading = false
      //         if (res) {
      //           this.$message({
      //             type: 'success',
      //             message: 'save success！'
      //           })
      //         } else {
      //           this.$message({
      //             type: 'info',
      //             message: res.msg
      //           })
      //         }
      //       })
      //       .catch(err => {
      //         this.editFormVisible = false
      //         this.loading = false
      //         this.$message.error('save failed！')
      //       })
      //   } else {
      //     return false
      //   }
      // })
    },
    // 删除公司
    deleteUser(index, row) {
      this.$confirm('delete?', 'Message', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        type: 'warning'
      })
        .then(() => {
          deptDelete(row.deptId)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: 'delete success!'
                })
                // this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('delete failed！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'delete cancel'
          })
        })
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false
    }
  },
  created(){
    this.getdata()
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>


