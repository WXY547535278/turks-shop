<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->
    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">
      <el-form-item label="id">
        <el-input v-model="formInline.id"
                  placeholder="id"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="formInline.phone"
                  placeholder="电话号码"></el-input>
      </el-form-item>
      <el-form-item label="等级">
        <el-input v-model="formInline.rank"
                  placeholder="等级"></el-input>
      </el-form-item>
      <!-- <el-form-item label="用户状态 ">
        <el-select v-model="formInline.status"
                   placeholder="用户状态"
                   @change="onSubmit">
          <el-option label="正常使用过 "
                     value="1"></el-option>
          <el-option label="暂时停用"
                     value="2"></el-option>
          <el-option label="永久停用"
                     value="3"></el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="用户类型 ">
        <el-select v-model="formInline.type"
                   placeholder="用户类型 "
                   @change="onSubmit">
          <el-option label="普通用户 "
                     value="1"></el-option>
          <el-option label="平台用户"
                     value="2"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <!-- 用户信息 -->
      <el-table-column prop="id"
                       label="id"
                       width="250"></el-table-column>
      <el-table-column prop="name"
                       label="昵称"
                       width="200"></el-table-column>
      <el-table-column prop="phone"
                       label="电话"
                       width="150"></el-table-column>
      <el-table-column label="头像"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.img"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column prop="rank"
                       label="等级"
                       width="150"></el-table-column>
      <!-- <el-table-column prop="status"
                       label="用户状态"
                       width="150"></el-table-column>
      <el-table-column prop="type"
                       label="用户类型"
                       width="150"></el-table-column> -->
      <el-table-column prop="wechatCode"
                       label="微信号码"
                       width="150"></el-table-column>
      <el-table-column label="创建时间"
                       width="150">
        <template slot-scope="scope">{{ parseTime(scope.row.time) }}</template>
      </el-table-column>

      <!-- 推荐人信息 -->
      <!-- <el-table-column prop="masterId"
                       label="推荐人id"
                       width="150"></el-table-column>
      <el-table-column prop="masterName"
                       label="推荐人姓名"
                       width="150"></el-table-column>
      <el-table-column label="头像"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.masterImg"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column prop="masterPhone"
                       label="推荐人电话"
                       width="170"></el-table-column> -->
      <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="putPlatform(scope.row.id)"
                     type="text"
                     size="small">修改</el-button>
          <el-button @click.native.prevent="deletePlatform(scope.row.id,1)" 
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

    <!--  查看区域  -->
    <!-- <el-dialog title="用户购买课程列表"
               :visible.sync="showView"
               width="80%">
      <el-table :data="payclass">
        <el-table-column prop="id"
                         label="课程id"
                         width="300"></el-table-column>
        <el-table-column prop="name"
                         label="课程名称"
                         width="300"></el-table-column>
        <el-table-column prop="price"
                         label="课程价格"
                         width="300"></el-table-column>
      </el-table>
    </el-dialog> -->

  </div>
</template>

<script>
import { getUserList, getClassById, delUser } from "@/api/user";
import { parseTime } from "@/utils/index"

export default {
  name: 'userlist',
  data () {
    return {
      tableData: [],
      payclass: [],
      currentPage4: 1,
      showView: false,
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      // 搜索内容
      formInline: {
        status: 1,
        type: 2,
        rank: null,
        id: null,
        phone: null
      },
    }
  },
  mounted () {
    this.getUserList()
  },

  created () {
  },

  methods: {
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      // console.log('当前每页数量', e)
      this.pageSize = e
      this.getUserList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getUserList()
    },
    // 搜索
    onSubmit () {
      this.getUserList()
    },
    // 获取用户列表
    getUserList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        rank: this.formInline.rank,
        id: this.formInline.id,
        phone: this.formInline.phone,
        status: this.formInline.status,
        type: this.formInline.type
      }
      getUserList(query).then(res => {
        console.log('获取到的用户列表', res)
        this.tableData = res.data
        this.total = res.pageTotal
      })
    },
    // 格式化时间
    parseTime (time) {
      return parseTime(time)
    },
    putPlatform () {

    },
    deletePlatform () {

    }
  }
}
</script>

<style lang="scss" scoped>
.blockpage {
  padding-top: 2%;
}
</style>
