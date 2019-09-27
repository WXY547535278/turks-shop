<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->
    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">
      <el-form-item label="openid">
        <el-input v-model="openid"
                  placeholder="openid"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="name"
                  placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="phone"
                  placeholder="电话号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <el-table-column prop="openid"
                       label="openid"
                       width="250"></el-table-column>
      <el-table-column prop="nickName"
                       label="昵称"
                       width="200"></el-table-column>
      <!-- <el-table-column prop="balance"
                       label="余额"
                       width="150"></el-table-column> -->
      <el-table-column prop="phone"
                       label="电话"
                       width="150"></el-table-column>
      <el-table-column prop="name"
                       label="真实姓名"
                       width="150"></el-table-column>
      <el-table-column label="头像"
                       width="150">

        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.headImg"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column prop="address"
                       label="用户地址"
                       width="170"></el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="showList(scope.row.openid)"
                     type="text"
                     size="small">查看用户购买课程</el-button>
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

    <!--  查看课程区域  -->
    <el-dialog title="用户购买课程列表"
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

        <!-- <el-table-column fixed="right"
                         label="操作"
                         width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="toPut(scope.row.id)"
                       type="text"
                       size="small">修改</el-button>
            <el-button @click.native.prevent="deleteThis(scope.row.id,1)"
                       type="text"
                       size="small">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-dialog>

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
      formInline: {
        username: '',
        region: ''
      },
      showView: false,
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      // 搜索内容
      name: null,
      openid: null,
      phone: null
    }
  },
  mounted () {
    this.getUserList()
  },

  created () {
  },

  methods: {
    showList (id) {
      this.showView = true
      this.payclass = []
      console.log(id)
      getClassById(id).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].free == 'b') {
            this.payclass.push(res.data[i])
          }
        }
        console.log(this.payclass)
      })
    },
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
        name: this.name,
        openid: this.openid,
        phone: this.phone
      }
      getUserList(query).then(res => {
        // console.log(res)
        this.tableData = res.data
        this.total = res.pageTotal
      })
    },
    // 格式化时间
    parseTime (time) {
      return parseTime(time)
    },
    toPut (id) {
      console.log(id)
      this.$router.push({ path: 'userClass/put/' + id })
    }

  }
}
</script>

<style lang="scss" scoped>
.blockpage {
  padding-top: 2%;
}
</style>
