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
      <el-form-item style="float: right;">
        <el-button type="success"
                   @click="showPost">新增平台用户</el-button>
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
                       label="名字"
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
      <el-table-column prop="score"
                       label="信用分"
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
      <el-table-column label="邀请二维码"
                       width="150">
        <template slot-scope="scope"><img v-image-preview
               style="width: 35px; height: 35px"
               :src="scope.row.qrCode"
               fit="fill" /></template>
      </el-table-column>
      <el-table-column prop="password"
                       label="密码"
                       width="200"></el-table-column>
      <el-table-column label="创建时间"
                       width="200">
        <template slot-scope="scope">{{ parseTime(scope.row.time) }}</template>
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="showNext(scope.row.id)"
                     type="text"
                     size="small">查看下级</el-button>
          <el-button @click.native.prevent="showUser(scope.row.id)"
                     type="text"
                     size="small">帮忙注册的用户</el-button>
          <el-button @click.native.prevent="showPut(scope.row.id)"
                     type="text"
                     size="small">修改</el-button>
          <el-button @click.native.prevent="deleteThis(scope.row.id,1)"
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
                     :current-page="currentPage"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>

    <!--  新增区  -->
    <el-dialog title="列表"
               :visible.sync="postView"
               width="80%">
      <el-form ref="form"
               :model="postForm"
               label-width="120px">
        <el-form-item label="姓名:">
          <el-input v-model="postForm.name"
                    style="width: auto;"
                    type="text" />
        </el-form-item>
        <el-form-item label="头像:">
          <template>
            <img style="width: 100px; height: 100px"
                 :src="postForm.img"
                 fit="fill" />
          </template>
          <el-upload class="upload-demo"
                     :action="upload_url"
                     :headers="upload_head"
                     :multiple=false
                     :limit=1
                     :on-success="upload_success_post"
                     :file-list="fileList">
            <el-button size="small"
                       type="primary">点击上传</el-button>
            <div slot="tip"
                 class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="postForm.phone"
                    style="width: auto;"
                    type="text" />
        </el-form-item>
        <el-form-item label="微信号:">
          <el-input v-model="postForm.wechatCode"
                    style="width: auto;"
                    type="text" />
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="postForm.password"
                    style="width: auto;"
                    type="text" />
        </el-form-item>
        <el-form-item label="等级:">
          <el-input v-model="postForm.rank"
                    style="width: auto;"
                    type="text" />
        </el-form-item>
        <hr>
        <el-form-item>
          <el-button type="primary"
                     @click="postThis(postForm)">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

    <!--  修改区  -->
    <el-dialog title="列表"
               :visible.sync="putView"
               width="80%">
      <el-form ref="form"
               :model="putForm"
               label-width="120px">

        <!-- <el-form-item label="id:">
          <el-input v-model="putForm.id"
                    style="width: auto;"
                    type="text"
                    :disabled="true" />
        </el-form-item> -->

        <el-form-item label="姓名:">
          <el-input v-model="putForm.name"
                    style="width: auto;"
                    type="text" />
        </el-form-item>
        <el-form-item label="头像:">
          <template>
            <img style="width: 100px; height: 100px"
                 :src="putForm.img"
                 fit="fill" />
          </template>
          <el-upload class="upload-demo"
                     :action="upload_url"
                     :headers="upload_head"
                     :multiple=false
                     :limit=1
                     :on-success="upload_success_put"
                     :file-list="fileList">
            <el-button size="small"
                       type="primary">点击上传</el-button>
            <div slot="tip"
                 class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="putForm.phone"
                    style="width: auto;"
                    type="text" />
        </el-form-item>
        <el-form-item label="微信号:">
          <el-input v-model="putForm.wechatCode"
                    style="width: auto;"
                    type="text" />
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="putForm.password"
                    style="width: auto;"
                    type="text" />
        </el-form-item>
        <el-form-item label="等级:">
          <el-input v-model="putForm.rank"
                    style="width: auto;"
                    type="text" />
        </el-form-item>
        <el-form-item label="信用分:">
          <el-input v-model="putForm.score"
                    style="width: auto;"
                    type="text" />
        </el-form-item>

        <hr>
        <el-form-item>
          <el-button type="primary"
                     @click="putThis(putForm)">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

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

    <!--  查看帮忙注册的用户区域  -->
    <el-dialog title="查看帮忙注册的用户"
               :visible.sync="showView1"
               width="80%">
      <el-table :data="tableData2">
        <!-- 帮助注册信息 -->
        <el-table-column prop="leekName"
                         label="名字"
                         width="auto"></el-table-column>
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

  </div>
</template>

<script>
import { getUserList, delUser, postUser, putUser } from "@/api/user";
import { parseTime } from "@/utils/index"
import { getdragDownList } from "@/api/dragDown"
import { getUserTeam } from "@/api/team"
import { getUploadUrl } from '@/utils/index'
import { getToken } from '@/utils/auth.js'

export default {
  data () {
    return {
      upload_url: getUploadUrl(), // 请求的url
      upload_head: {
        Authorization: getToken()
      }, // 上传请求头
      tableData: [],
      tableData1: [],
      tableData2: [],
      payclass: [],
      fileList: [],
      currentPage: 1,
      currentPage1: 1,
      currentPage2: 1,
      showView: false,
      showView1: false,
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
        status: 1,
        type: 2,
        rank: null,
        id: null,
        phone: null
      },
      // 新增
      postView: false,
      postForm: {
        name: null,
        img: null,
        phone: null,
        rank: null,
        wechatCode: null,
        password: null,
        type: 2
      },
      // 修改
      putView: false,
      putForm: {
        id: null,
        name: null,
        img: null,
        phone: null,
        rank: null,
        wechatCode: null,
        password: null,
        score: null
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
      this.showView1 = true
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
        this.tableData2 = res.data
        this.total2 = res.pageTotal
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
        this.tableData = res.data
        this.total = res.pageTotal
      })
    },
    // 查看下级
    showNext (user_id) {
      this.getUserTeam(user_id)
      this.showView = true
      this.id1 = user_id
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
    // 格式化时间
    parseTime (time) {
      return parseTime(time)
    },
    // 删除平台用户
    deleteThis (id) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser(id).then(res => {
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getUserList()
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
    // 新增相关
    showPost () {
      this.postView = true
      this.postForm.name = null
      this.postForm.img = null
      this.postForm.phone = null
      this.postForm.rank = null
      this.postForm.wechatCode = null
      this.postForm.password = null
      this.postForm.type = 2
    },
    postThis (data) {
      postUser(data).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.postView = false
        this.getUserList()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '新增失败'
        })
      })
    },
    // 处理banner上传图片
    upload_success_post (response, file, fileList) {
      if (file.response.code === '200') {
        this.fileList = []
        this.postForm.img = file.response.data
      } else {
        this.$message.error('上传错误!请重试')
      }
    },

    // 修改相关
    showPut (id) {
      var thisBean = {}
      for (var i = 0; i < this.tableData.length; i++) {
        if (id === this.tableData[i].id) {
          thisBean = this.tableData[i]
          break
        }
      }
      this.putView = true
      this.putForm.id = thisBean.id
      this.putForm.img = thisBean.img
      this.putForm.name = thisBean.name
      this.putForm.phone = thisBean.phone
      this.putForm.rank = thisBean.rank
      this.putForm.wechatCode = thisBean.wechatCode
      this.putForm.password = thisBean.password
      this.putForm.score = thisBean.score
    },
    putThis (data) {
      putUser(data).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.putView = false
        this.getUserList()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        })
      })
    },
    upload_success_put (response, file, fileList) {
      if (file.response.code === '200') {
        this.fileList = []
        this.putForm.img = file.response.data
      } else {
        this.$message.error('上传错误!请重试')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.blockpage {
  padding-top: 2%;
}
</style>
