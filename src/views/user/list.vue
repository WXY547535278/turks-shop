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
      <el-form-item label="电话号码">
        <el-input v-model="formInline.phone"
                  placeholder="电话号码"></el-input>
      </el-form-item>
      <el-form-item label="等级">
        <el-input v-model="formInline.rank"
                  placeholder="等级"></el-input>
      </el-form-item>
      <el-form-item label="用户状态 ">
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
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <!-- 用户信息 -->
      <!-- <el-table-column prop="id"
                       label="id"
                       width="250"></el-table-column> -->
      <el-table-column prop="name"
                       label="昵称"
                       width="200"></el-table-column>
      <el-table-column prop="phone"
                       label="电话"
                       width="150"></el-table-column>
      <el-table-column prop="sparePhone"
                       label="备用手机号"
                       width="150"></el-table-column>
      <el-table-column prop="invitation"
                       label="个人邀请码"
                       width="150"></el-table-column>
      <el-table-column label="邀请二维码"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.qrCode"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column label="头像"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.img"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column label="头像"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.wechatImg"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column prop="rank"
                       label="等级"
                       width="150"></el-table-column>
      <el-table-column prop="status"
                       label="用户状态"
                       width="150"></el-table-column>
      <el-table-column prop="wechatCode"
                       label="微信号码"
                       width="150"></el-table-column>
      <el-table-column label="店铺二维码"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.shopQrCode"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column prop="zfb"
                       label="支付宝号"
                       width="150"></el-table-column>
      <el-table-column prop="score"
                       label="信用分"
                       width="150"></el-table-column>

      <el-table-column label="创建时间"
                       width="150">
        <template slot-scope="scope">{{ parseTime(scope.row.time) }}</template>
      </el-table-column>

      <!-- 推荐人信息 -->
      <!-- <el-table-column prop="masterId"
                       label="推荐人id"
                       width="150"></el-table-column> -->
      <el-table-column prop="masterName"
                       label="推荐人姓名"
                       width="150"></el-table-column>
      <el-table-column label="推荐人头像"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.masterImg"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column prop="masterPhone"
                       label="推荐人电话"
                       width="170"></el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="showNext(scope.row.id)"
                     type="text"
                     size="small">查看下级</el-button>
          <el-button @click.native.prevent="showAddress(scope.row.id)"
                     type="text"
                     size="small">查看用户地址</el-button>
          <el-button @click.native.prevent="showUser(scope.row.id)"
                     type="text"
                     size="small">帮忙注册的用户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区 -->

    <div class="blockpage"
         style="margin:0px auto">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

    <!--  查看下级用户区域  -->
    <el-dialog title="查看下级用户"
               :visible.sync="showView"
               width="80%">
      <el-table :data="tableData1">
        <el-table-column label="下级头像"
                         width="150">
          <template slot-scope="scope"><img v-image-preview
                 style="width: 35px; height: 35px"
                 :src="scope.row.leekImg"
                 fit="fill" /></template>
        </el-table-column>
        <el-table-column prop="leekName"
                         label="下级姓名"
                         width="150"></el-table-column>
        <el-table-column prop="leekPhone"
                         label="下级电话"
                         width="150"></el-table-column>
        <el-table-column prop="leekRank"
                         label="下级等级"
                         width="150"></el-table-column>
        <el-table-column prop="leekStatus"
                         label="下级状态"
                         width="150"></el-table-column>
        <el-table-column label="下级创建时间"
                         width="150">
          <template slot-scope="scope">{{ parseTime(scope.row.leekTime) }}</template>
        </el-table-column>
        <el-table-column prop="leekWechat"
                         label="下级微信号码"
                         width="150"></el-table-column>
        <el-table-column prop="type"
                         label="下级类型"
                         width="150"></el-table-column>
        <!-- <el-table-column prop="masterRank"
                         label="上级的等级"
                         width="150"></el-table-column> -->
      </el-table>
      <div class="blockpage"
           style="margin:0px auto">
        <el-pagination @size-change="handleSizeChange1"
                       @current-change="handleCurrentChange1"
                       :current-page="currentPage1"
                       :page-sizes="[10, 20, 30, 40]"
                       :page-size="pageSize1"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total1">
        </el-pagination>
      </div>
    </el-dialog>

    <!--  查看用户地址区域  -->
    <el-dialog title="查看用户地址"
               :visible.sync="showView1"
               width="80%">
      <el-table :data="tableData2">
        <!-- 地址列表 -->
        <el-table-column prop="province"
                         label="省"
                         width="200"></el-table-column>
        <el-table-column prop="city"
                         label="市"
                         width="200"></el-table-column>
        <el-table-column prop="area"
                         label="区"
                         width="200"></el-table-column>
        <el-table-column prop="detail"
                         label="详细地址"
                         :show-overflow-tooltip="true"
                         width="600"></el-table-column>
        <!-- <el-table-column fixed="right"
                         label="操作"
                         width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="showAddressDetail(scope.row.id)"
                       type="text"
                       size="small">查看详情</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-dialog>

    <!--  查看帮忙注册的用户区域  -->
    <el-dialog title="查看帮忙注册的用户"
               :visible.sync="showView2"
               width="80%">
      <el-table :data="tableData3">
        <!-- 帮助注册信息 -->
        <el-table-column prop="leekName"
                         label="名字"
                         width="150"></el-table-column>
        <el-table-column prop="leekPhone"
                         label="手机号"
                         width="auto"></el-table-column>
        <el-table-column prop="leekWechat"
                         label="微信"
                         width="auto"></el-table-column>
        <el-table-column label="注册时间"
                         width="auto">
          <template slot-scope="scope">{{ parseTime(scope.row.time) }}</template>
        </el-table-column>
      </el-table>
      <div class="blockpage"
           style="margin:0px auto">
        <el-pagination @size-change="handleSizeChange2"
                       @current-change="handleCurrentChange2"
                       :current-page="currentPage2"
                       :page-sizes="[10, 20, 30, 40]"
                       :page-size="pageSize2"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total2">
        </el-pagination>
      </div>
    </el-dialog>

    <!--  查看区域  -->
    <!-- <el-dialog title="地址"
               :visible.sync="showView2"
               width="60%">
      <el-card class="box-card">
        <div>
          <div>
          <span style="margin-right: 20px;font-weight:600">省　　　:</span><span>{{ showMessage.province }}</span>
          </div>
          <el-divider></el-divider>
          <div>
          <span style="margin-right: 20px;font-weight:600">市　　　:</span><span>{{ showMessage.city }}</span>
          </div>
          <el-divider></el-divider>
          <div>
          <span style="margin-right: 20px;font-weight:600">区　　　:</span><span>{{ showMessage.area }}</span>
          </div>
          <el-divider></el-divider>
          <div>
          <span style="margin-right: 20px;font-weight:600">地址详情:</span><span>{{ showMessage.detail }}</span>
          </div>
          <el-divider></el-divider>
          
        </div>
      </el-card>
    </el-dialog> -->

  </div>
</template>

<script>
import { getUserList, getClassById, delUser } from "@/api/user"
import { getAddressList, getAddressById } from "@/api/address"
import { getdragDownList } from "@/api/dragDown"
import { getUserTeam } from "@/api/team"
import { parseTime } from "@/utils/index"

export default {
  name: 'userlist',
  data () {
    return {
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      payclass: [],
      currentPage: 1,
      currentPage1: 1,
      currentPage2: 1,
      showView: false,
      showView1: false,
      showView2: false,
      // showView2: false,
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      // 下级用户
      pageindex1: 0,
      pageSize1: 10,
      total1: 0,
      // 帮忙注册
      pageindex2: 0,
      pageSize2: 10,
      total2: 0,
      // 搜索内容
      formInline: {
        status: null,
        type: 1,
        rank: null,
        id: null,
        phone: null
      },
      // 地址详情
      showMessage: {
        province: null,
        city: null,
        area: null,
        detail: null
      },
      id1: null,
      id2: null
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
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange1 (e) {
      // console.log('当前每页数量', e)
      this.pageSize1 = e
      this.getUserTeam(this.id1)
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange1 (e) {
      // console.log('当前页码', e)
      this.pageindex1 = e - 1
      this.getUserTeam(this.id1)
    },
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange2 (e) {
      // console.log('当前每页数量', e)
      this.pageSize2 = e
      this.getdragDownList(this.id2)
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange2 (e) {
      // console.log('当前页码', e)
      this.pageindex2 = e - 1
      this.getdragDownList(this.id2)
    },
    // 搜索
    onSubmit () {
      this.getUserList()
    },
    // 帮忙注册列表
    showUser (id) {
      this.getdragDownList(id)
      this.showView2 = true
      this.id2 = id
    },
    // 获取帮忙注册列表
    getdragDownList (id) {
      let query = {
        pageIndex: this.pageindex2,
        pageSize: this.pageSize2,
        userId: id
      }
      getdragDownList(query).then(res => {
        console.log('获取到的帮助注册列表', res)
        this.tableData3 = res.data
        this.total2 = res.pageTotal
      })
    },
    showAddress (user_id) {
      this.showView1 = true
      this.getAddressList(user_id)
    },
    // 获取地址列表
    getAddressList (user_id) {
      let query = {
        pageIndex: 0,
        pageSize: 10,
        userId: user_id
      }
      getAddressList(query).then(res => {
        console.log('获取地址列表', res.data)
        this.tableData2 = res.data
        // this.total = res.pageTotal
      })
    },
    // 获取地址详情
    // showAddressDetail (id) {
    //   this.showView2 = true
    //   getAddressById(id).then(res => {
    //     this.showMessage.province = res.data.province
    //     this.showMessage.city = res.data.city
    //     this.showMessage.area = res.data.area
    //     this.showMessage.detail = res.data.detail
    //   })
    // },
    // 查看下级
    showNext (user_id) {
      this.getUserTeam(user_id)
      this.id1 = user_id
      this.showView = true
    },
    // 获取下级用户列表
    getUserTeam (user_id) {
      let query = {
        pageIndex: this.pageindex1,
        pageSize: this.pageSize1,
        userId: user_id
      }
      getUserTeam(query).then(res => {
        console.log('获取到的团队列表', res)
        this.tableData1 = res.data.map(item => {
          if (item.leekStatus == 1) {
            item.leekStatus = '正常使用过'
          } else if (item.leekStatus == 2) {
            item.leekStatus = '暂时停用'
          } else {
            item.leekStatus = '永久停用'
          }
          if (item.type == 1) {
            item.type = '直推'
          } else {
            item.type = '下级发展的'
          }
          return item
        })
        // this.tableData = res.data
        this.total1 = res.pageTotal
      })
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
        this.tableData = res.data.map(item => {
          if (item.status == 1) {
            item.status = '正常使用过'
          } else if (item.status == 2) {
            item.status = '暂时停用'
          } else {
            item.status = '永久停用'
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
