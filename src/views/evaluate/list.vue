<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->
    <el-form :inline="true"
             :model="formInline"
             class="demo-form-inline">
      <!-- <el-form-item label="id">
        <el-input v-model="formInline.id"
                  placeholder="id"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="订单id">
        <el-input v-model="formInline.orderId"
                  placeholder="订单id "></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="用户id">
        <el-input v-model="formInline.userId"
                  placeholder="用户id"></el-input>
      </el-form-item> -->
      <el-form-item label="评价类型">
        <el-select v-model="formInline.type"
                   placeholder="评价类型 "
                   @change="onSubmit">
          <el-option label="好评   "
                     value="1"></el-option>
          <el-option label="中评 "
                     value="2"></el-option>
          <el-option label="差评 "
                     value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <!-- 评价列表 -->
      <el-table-column prop="id"
                       label="id"
                       width="250"></el-table-column>
      <el-table-column prop="userId"
                       label="用户id"
                       width="200"></el-table-column>
      <el-table-column prop="orderId"
                       label="订单id"
                       width="200"></el-table-column>
      <el-table-column prop="type"
                       label="评价类型"
                       width="150"></el-table-column>
      <el-table-column label="评价时间"
                       width="150">
        <template slot-scope="scope">{{ parseTime(scope.row.time) }}</template>
      </el-table-column>
      <!-- <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="showList(scope.row.id)"
                     type="text"
                     size="small">查看详情</el-button>
        </template>
      </el-table-column> -->
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
  </div>
</template>

<script>
import { getEvaluateList } from "@/api/evaluate";
import { parseTime } from "@/utils/index"

export default {
  name: 'userlist',
  data () {
    return {
      tableData: [],
      payclass: [],
      currentPage4: 1,
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      // 搜索内容
      formInline: {
        type: null,
        userId: null,
        orderId: null,
        id: null
      },
    }
  },
  mounted () {
    this.getEvaluateList()
  },

  created () {
  },

  methods: {
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      // console.log('当前每页数量', e)
      this.pageSize = e
      this.getEvaluateList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getEvaluateList()
    },
    // 搜索
    onSubmit () {
      this.getEvaluateList()
    },
    // 获取用户列表
    getEvaluateList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        type: this.formInline.type,
        id: this.formInline.id,
        userId: this.formInline.userId,
        orderId: this.formInline.orderId
      }
      getEvaluateList(query).then(res => {
        console.log('获取到的评价列表', res.data)
        this.tableData = res.data.map(item => {
          if (item.type == 1) {
            item.type = '好评'
          } else if (item.type == 2) {
            item.type = '中评'
          } else {
            item.type = '差评'
          }
          return item
        })
        // this.tableData = res.data
        this.total = res.pageTotal
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
