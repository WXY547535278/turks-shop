<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->
    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">

      <el-form-item label="投诉人id">
        <el-input v-model="formInline.masterId"
                  placeholder="投诉人id"></el-input>
      </el-form-item>

      <el-form-item label="被投诉人id">
        <el-input v-model="formInline.slaverId"
                  placeholder="被投诉人id"></el-input>
      </el-form-item>

      <el-form-item label="用户状态 ">
        <el-select v-model="formInline.status"
                   placeholder="用户状态"
                   @change="onSubmit">
          <el-option label="审核中  "
                     value="1"></el-option>
          <el-option label="通过 "
                     value="2"></el-option>
          <el-option label="拒绝"
                     value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <!-- 投诉内容-->
      <el-table-column prop="id"
                       label="id"
                       width="250"></el-table-column>
      <el-table-column label="投诉图片"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.imgs"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column prop="text"
                       label="投诉内容"
                       width="200"></el-table-column>
      <!-- 投诉人 -->
      <el-table-column prop="masterId"
                       label="投诉人id"
                       width="150"></el-table-column>
      <el-table-column prop="masterName"
                       label="投诉人姓名"
                       width="150"></el-table-column>
      <el-table-column prop="masterName"
                       label="投诉人电话"
                       width="150"></el-table-column>
      <el-table-column label="投诉人头像"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.masterImg"
               fit="fill" /></template>
      </el-table-column>
      <!-- 被投诉人 -->
      <el-table-column prop="slaverId"
                       label="被投诉人id"
                       width="150"></el-table-column>
      <el-table-column prop="slaverName"
                       label="被投诉人姓名"
                       width="150"></el-table-column>
      <el-table-column prop="slaverPhone"
                       label="被投诉人电话"
                       width="150"></el-table-column>
      <el-table-column label="投诉人头像"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.slaverImg"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column label="投诉时间"
                       width="150">
        <template slot-scope="scope">{{ parseTime(scope.row.time) }}</template>
      </el-table-column>
      <el-table-column prop="status"
                       label="状态"
                       width="150"></el-table-column>

      <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="putList(scope.row.id)"
                     type="text"
                     size="small">审核</el-button>
          <el-button @click.native.prevent="deleteThis(scope.row.id)"
                     type="text"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区 -->

    <div class="blockpage"
         style="margin:0px auto">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage4"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

    <!-- 修改状态  -->
    <el-dialog title="操作"
               :visible.sync="showView"
               width="80%">
      <el-form ref="form"
               :model="putForm"
               label-width="120px">
        <el-form-item label="投诉状态 ">
          <el-select v-model="putForm.status"
                     placeholder="投诉状态">
            <el-option label="通过 "
                       value="2"></el-option>
            <el-option label="拒绝"
                       value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="putThis()">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { getComplaintList, putComplaint, deleteComplaint } from "@/api/complaint";
import { parseTime } from "@/utils/index"

export default {
  name: 'userlist',
  data () {
    return {
      tableData: [],
      currentPage4: 1,
      showView: false,
      putForm: {
        id: null,
        status: null
      },
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      // 搜索内容
      formInline: {
        status: null,
        masterId: null,
        slaverId: null
      }
    }
  },
  mounted () {
    this.getComplaintList()
  },

  created () {
  },

  methods: {
    putList (id) {
      console.log('投诉id', id)
      this.putForm.id = id
      this.showView = true
    },
    // 修改审核状态
    putThis () {
      putComplaint(this.putForm.id, this.putForm.status).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.showView = false
        this.getComplaintList()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        })
      })
    },
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      // console.log('当前每页数量', e)
      this.pageSize = e
      this.getComplaintList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getComplaintList()
    },
    // 搜索
    onSubmit () {
      this.getComplaintList()
    },
    // 获取用户列表
    getComplaintList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        status: this.formInline.status,
        masterId: this.formInline.masterId,
        slaverId: this.formInline.slaverId
      }
      getComplaintList(query).then(res => {
        console.log('获取到的投诉列表', res)
        this.tableData = res.data
        this.total = res.pageTotal
      })
    },
    // 删除投诉
    deleteThis (id) {
      deleteComplaint(id).then(res => {
        if (res.code === '200') {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.getComplaintList()
        } else {
          this.$message({
            type: 'warning',
            message: '操作失败'
          })
        }
      })
    },
    // 格式化时间
    parseTime (time) {
      return parseTime(time)
    }

  }
}
</script>

<style lang="scss" scoped>
.blockpage {
  padding-top: 2%;
}
</style>
