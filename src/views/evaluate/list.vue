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
      <el-form-item label="订单id">
        <el-input v-model="formInline.orderId"
                  placeholder="订单id "></el-input>
      </el-form-item>
      <el-form-item label="用户id">
        <el-input v-model="formInline.userId"
                  placeholder="用户id"></el-input>
      </el-form-item>
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
                       width="auto"></el-table-column>
      <el-table-column label="评价时间"
                       width="auto">
        <template slot-scope="scope">{{ parseTime(scope.row.time) }}</template>
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="auto">
        <template slot-scope="scope">
          <!-- <el-button @click.native.prevent="showOrderList(scope.row.orderId)"
                     type="text"
                     size="small">查看评价订单</el-button> -->
          <el-dropdown>
            <el-button type="primary">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native.prevent="showOrderList(scope.row.orderId)">查看评价订单</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="putEvaluateType(scope.row.id)">修改评价</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="deleteThis(scope.row.id,1)">删除评价</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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

    <!--  查看订单区域  -->
    <el-dialog title="地址"
               :visible.sync="showView"
               width="80%">
      <el-table :data="tableData1">
        <el-table-column prop="leekName"
                         label="下单人姓名"
                         width="150"></el-table-column>
        <el-table-column prop="leekPhone"
                         label="下单人电话"
                         width="150"></el-table-column>
        <el-table-column prop="leekWechat"
                         label="下单人微信"
                         width="150"></el-table-column>
        <el-table-column prop="leekZfb"
                         label="下单人支付宝"
                         width="150"></el-table-column>
        <el-table-column label="下单人头像"
                         width="150">
          <template slot-scope="scope"><img v-image-preview
                 style="width: 35px; height: 35px"
                 :src="scope.row.leekImg"
                 fit="fill" /></template>
        </el-table-column>
        <!-- <el-table-column prop="status"
                         label="订单状态"
                         width="150"></el-table-column> -->
        <el-table-column prop="deliveryType"
                         label="配送类型"
                         width="150"></el-table-column>
        <el-table-column prop="rank"
                         label="下单人当前等级"
                         width="150"></el-table-column>
        <el-table-column prop="aldebaran"
                         label="下单人下单后等级"
                         width="150"></el-table-column>
        <el-table-column prop="amount"
                         label="订单总金额"
                         width="150"></el-table-column>
        <el-table-column prop="address"
                         label="地址"
                         width="150"></el-table-column>
        <el-table-column label="下单时间"
                         width="150">
          <template slot-scope="scope">{{ parseTime(scope.row.orderTime) }}</template>
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="showOrderDetail(scope.row.id)"
                       type="text"
                       size="small">查看订单详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 查看订单详情  -->
    <el-dialog title="查看详情"
               :visible.sync="showView1"
               width="80%">
      <el-table :data="orderDetail">
        <el-table-column prop="name"
                         label="产品名"
                         width="300"></el-table-column>
        <el-table-column label="图片"
                         width="150">
          <template slot-scope="scope"><img v-image-preview
                 style="width: 35px; height: 35px"
                 :src="JSON.parse(scope.row.banner)"
                 fit="fill" /></template>
        </el-table-column>
        <el-table-column prop="skuName"
                         label="规格名"
                         width="300"></el-table-column>
        <el-table-column prop="num"
                         label="购买数量"
                         width="300"></el-table-column>
        <el-table-column prop="price"
                         label="价格"
                         width="300"></el-table-column>
      </el-table>
    </el-dialog>

    <!-- 修改评价状态  -->
    <el-dialog title="修改评价"
               :visible.sync="showView2"
               width="80%">
      <el-form ref="form"
               :model="putForm"
               label-width="120px">
        <el-form-item label="评价">
          <el-select v-model="putForm.type"
                     placeholder="评价">
            <el-option label="好评"
                       value="1"></el-option>
            <el-option label="中评"
                       value="2"></el-option>
            <el-option label="差评"
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
import { getOrderList, getOrderDetail } from "@/api/order"
import { getEvaluateList, putEvaluate, delEvaluate } from "@/api/evaluate"
import { parseTime } from "@/utils/index"

export default {
  name: 'userlist',
  data () {
    return {
      tableData: [],
      tableData1: [],
      orderDetail: null,
      payclass: [],
      currentPage4: 1,
      showView: false,
      showView1: false,
      showView2: false,
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
      putForm: {
        id: null,
        type: null
      }
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
    // 修改产品状态
    putEvaluateType (id) {
      this.putForm.id = id
      this.showView2 = true
    },
    // 修改审核状态
    putThis () {
      putEvaluate(this.putForm).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.showView2 = false
        this.getEvaluateList()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        })
      })
    },
    // 搜索
    onSubmit () {
      this.getEvaluateList()
    },
    // 查看订单列表
    showOrderList (order_id) {
      this.showView = true
      this.getOrderList(order_id)
    },
    // 查看订单详情
    showOrderDetail (orderId) {
      this.showView1 = true
      console.log('获取到的订单id', orderId)
      getOrderDetail(orderId).then(res => {
        console.log('获取订单详情', res)
        this.orderDetail = res.data
      })
    },
    // 获取订单列表
    getOrderList (order_id) {
      let query = {
        pageIndex: 0,
        pageSize: 10,
        id: order_id
      }
      getOrderList(query).then(res => {
        console.log('获取订单列表', res)
        this.tableData1 = res.data.map(item => {
          if (item.status == 1) {
            item.status = '还未审核 '
          } else if (item.status == 2) {
            item.status = '已经审核/待发货'
          } else if (item.status == 3) {
            item.status = '已发货/未收货'
          } else if (item.status == 4){
            item.status = '已收货/未评论'
          } else {
            item.status = '已评论 '
          }
          if (item.deliveryType == 1) {
            item.deliveryType = '自提'
          } else {
            item.deliveryType = '邮寄'
          }
          return item
        })
        // this.tableData = res.data
        // this.total = res.pageTotal
      })
    },
    deleteThis (id) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delEvaluate(id).then(res => {
          if (res.code == '200') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getEvaluateList()
          } else {
            this.$message({
              type: 'warning',
              message: '操作失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 获取评价列表
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
