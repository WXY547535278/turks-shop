<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">
    <!-- 搜索条件区域 -->

    <el-form :inline="true"
             class="demo-form-inline">
      <el-form-item style="float: right;">
        <el-button type="success"
                   @click="showPost">新增图库类型</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <el-table-column prop="id"
                       label="id"
                       width="250"></el-table-column>

      <el-table-column prop="name"
                       label="类型名"
                       width="100"></el-table-column>

      <el-table-column prop="sort"
                       label="排序序号"></el-table-column>

      <el-table-column fixed="right"
                       label="操作">
        <template slot-scope="scope">
          <el-button @click.native.prevent="showPut(scope.row.id)"
                     type="text"
                     size="small">修改</el-button>
          <el-button @click.native.prevent="deleteThis(scope.row.id)"
                     type="text"
                     size="small">删除</el-button>
          <el-button @click.native.prevent="addThis(scope.row.id)"
                     type="text"
                     size="small">添加图库</el-button>
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

    <!--  新增图库类型区  -->
    <el-dialog title="新增图库类型"
               :visible.sync="postView"
               width="80%">
      <el-form ref="form"
               :model="postForm"
               label-width="120px">

        <el-form-item label="排序序号:">
          <el-input v-model="postForm.sort"
                    style="width: auto;"
                    type="nummber" />
        </el-form-item>
        <el-form-item label="类型名:">
          <el-input v-model="postForm.name"
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
    <!--  为对应的图库类型添加图片  -->
    <el-dialog title="新增图库"
               :visible.sync="addImage"
               width="80%">
      <el-form ref="form"
               :model="postForm1"
               label-width="120px">
        <el-form-item label="排序序号:">
          <el-input v-model="postForm1.sort"
                    style="width: auto;"
                    type="nummber" />
        </el-form-item>
        <el-form-item label="跳转链接:">
          <el-input v-model="postForm1.param"
                    style="width: auto;" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="text.name"
                    style="width: auto;" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="text.phone"
                    style="width: auto;" />
        </el-form-item>
        <el-form-item label="微信">
          <el-input v-model="text.wx"
                    style="width: auto;" />
        </el-form-item>
        <el-form-item label="行业">
          <el-input v-model="text.industry"
                    style="width: auto;" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="text.bz"
                    style="width: auto;" />
        </el-form-item>
        <el-form-item label="图片:">
          <template>
            <img style="width: 100px; height: 100px"
                 :src="postForm1.img"
                 fit="fill" />
          </template>

          <el-upload class="upload-demo"
                     :action="upload_url"
                     :headers="upload_head"
                     :multiple=false
                     :limit=1
                     :on-success="upload_success_banner"
                     :file-list="fileList">
            <el-button size="small"
                       type="primary">点击上传</el-button>
            <div slot="tip"
                 class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>

        </el-form-item>

        <hr>
        <el-form-item>
          <el-button type="primary"
                     @click="postThis1(postForm1)">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>
    <!--  修改区  -->
    <el-dialog title="修改图库类型"
               :visible.sync="putView"
               width="80%">
      <el-form ref="form"
               :model="putForm"
               label-width="120px">

        <el-form-item label="id:">
          <el-input v-model="putForm.id"
                    style="width: auto;"
                    type="text"
                    :disabled="true" />
        </el-form-item>

        <el-form-item label="排序序号:">
          <el-input v-model="putForm.sort"
                    style="width: auto;"
                    type="nummber" />
        </el-form-item>
        <el-form-item label="类型名">
          <el-input v-model="putForm.name"
                    style="width: auto;" />
        </el-form-item>

        <hr>
        <el-form-item>
          <el-button type="primary"
                     @click="putThis(putForm)">保存</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

  </div>
</template>

<script>
import { getGalleryTypeList, deleteGalleryType, putGalleryType, postGalleryType } from '@/api/galleryType'
import { postGallery } from '@/api/gallery'
import { getUploadUrl } from '@/utils/index'
import { getToken } from '@/utils/auth.js'

export default {
  // name: 'complaintlist',
  data () {
    return {
      upload_url: getUploadUrl(), // 请求的url
      upload_head: {
        Authorization: getToken()
      }, // 上传请求头
      tableData: [],
      currentPage4: 1,
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      status: null,
      postView: false,
      addImage: false,
      postForm1: {
        img: null,
        text: null,
        sort: null,
        param: null,
        typeId: null
      },
      postForm: {
        sort: null,
        name: null
      },
      fileList: [],
      putView: false,
      putForm: {
        id: null,
        name: null,
        sort: null
      },
      text: {
        wx: null,
        phone: null,
        name: null,
        bz: null,
        industry: null
      }
    }
  },

  mounted () {
    this.getGalleryTypeList()
  },

  methods: {
    // 为对应图库类型添加图片
    addThis(typeId) {
      console.log('对应的类型id', typeId)
      this.addImage = true
      this.postForm1.sort = null
      this.postForm1.img = null
      this.postForm1.text = null
      this.postForm1.typeId = typeId
      this.postForm1.param = null
      this.text.wx = null
      this.text.phone = null
      this.text.name = null
      this.text.bz = null
      this.text.industry = null
    },
    postThis1 (data) {
      data.text = this.text
      postGallery(data).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.addImage = false
        this.getGalleryTypeList()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '新增失败'
        })
      })
    },
    //处理banner上传图片
    upload_success_banner (response, file, fileList) {
      if (file.response.code === '200') {
        this.fileList = []
        this.postForm1.img = file.response.data
      } else {
        this.$message.error('上传错误!请重试')
      }
    },
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      this.pageSize = e
      this.getGalleryTypeList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getGalleryTypeList()
    },
    // 搜索
    onSubmit () {
      this.getGalleryTypeList()
    },

    getGalleryTypeList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize
      }
      getGalleryTypeList(query).then(res => {
        // console.log(res)
        this.tableData = res.data
        this.total = res.pageTotal
      })
    },
    // 格式化时间
    parseTime (time) {
      return parseTime(time)
    },

    // 删除图库类型
    deleteThis (id) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGalleryType(id).then(res => {
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getGalleryTypeList()
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

    //新增相关
    showPost () {
      this.postView = true
      this.postForm.sort = null
      this.postForm.img = null
    },
    postThis (data) {
      postGalleryType(data).then(res => {
        this.$message({
          type: 'success',
          message: '新增成功!'
        })
        this.postView = false
        this.getGalleryTypeList()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '新增失败'
        })
      })
    },
    //修改相关
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
      this.putForm.sort = thisBean.sort
      this.putForm.name = thisBean.name
    },
    putThis (data) {

      putGalleryType(data).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.putView = false
        this.getGalleryTypeList()
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '修改失败'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.blockpage {
  padding-top: 2%;
}
</style>
