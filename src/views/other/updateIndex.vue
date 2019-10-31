<template>
  <div style="width:90%;margin-left:5%;margin-top:1%">

    <el-table :data="tableData">
      <!-- <el-table-column prop="id"
                       label="id"
                       width="250"></el-table-column> -->
      <el-table-column prop="text.name1"
                       :show-overflow-tooltip="true"
                       label="标题1"
                       width="auto"></el-table-column>
      <el-table-column prop="text.name2"
                       :show-overflow-tooltip="true"
                       label="标题2"
                       width="auto"></el-table-column>
      <el-table-column prop="text.name3"
                       :show-overflow-tooltip="true"
                       label="标题3"
                       width="auto"></el-table-column>
      <el-table-column prop="text.name4"
                       :show-overflow-tooltip="true"
                       label="标题4"
                       width="auto"></el-table-column>
      <el-table-column prop="text.name5"
                       :show-overflow-tooltip="true"
                       label="标题5"
                       width="auto"></el-table-column>
      <el-table-column prop="text.name6"
                       :show-overflow-tooltip="true"
                       label="标题6"
                       width="auto"></el-table-column>
      <el-table-column prop="text.name7"
                       :show-overflow-tooltip="true"
                       label="标题7"
                       width="auto"></el-table-column>
      <el-table-column prop="text.name8"
                       :show-overflow-tooltip="true"
                       label="标题8"
                       width="auto"></el-table-column>
      <el-table-column prop="text.name9"
                       :show-overflow-tooltip="true"
                       label="标题9"
                       width="auto"></el-table-column>
      <el-table-column prop="text.name10"
                       :show-overflow-tooltip="true"
                       label="标题10"
                       width="auto"></el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button type="primary">
              更多操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native.prevent="showPut(scope.row.id)">修改</el-dropdown-item>
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
    <!--  修改区  -->
    <el-dialog title="列表"
               :visible.sync="putView"
               width="80%">
      <el-form ref="form"
               :model="putForm"
               label-width="120px">
        <el-form-item label="标题1">
          <el-input v-model="indexName.name1"
                    style="width: 200px;" />
        </el-form-item>
        <el-form-item label="标题2">
          <el-input v-model="indexName.name2"
                    type="text"
                    style="width: 200px;" />
        </el-form-item>
        <el-form-item label="标题3">
          <el-input v-model="indexName.name3"
                    type="text"
                    style="width: 200px;" />
        </el-form-item>
        <el-form-item label="标题4">
          <el-input v-model="indexName.name4"
                    type="text"
                    style="width: 200px;" />
        </el-form-item>
        <el-form-item label="标题5">
          <el-input v-model="indexName.name5"
                    type="text"
                    style="width: 200px;" />
        </el-form-item>
        <el-form-item label="标题6">
          <el-input v-model="indexName.name6"
                    style="width: 200px;" />
        </el-form-item>
        <el-form-item label="标题7">
          <el-input v-model="indexName.name7"
                    type="text"
                    style="width: 200px;" />
        </el-form-item>
        <el-form-item label="标题8">
          <el-input v-model="indexName.name8"
                    type="text"
                    style="width: 200px;" />
        </el-form-item>
        <el-form-item label="标题9">
          <el-input v-model="indexName.name9"
                    type="text"
                    style="width: 200px;" />
        </el-form-item>
        <el-form-item label="标题10">
          <el-input v-model="indexName.name10"
                    type="text"
                    style="width: 200px;" />
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
import { getOtherLists, putOther } from "@/api/other"
import { parseTime } from "@/utils/index"

export default {
  data () {
    return {
      tableData: [],
      currentPage4: 1,
      pageindex: 0, // 当前页
      pageSize: 10, // 每页数量
      total: 0, // 数量总条数
      putView: false,
      putForm: {
        id: null,
        text: null,
        type: 12
      },
      indexName: {
        name1: null,
        name2: null,
        name3: null,
        name4: null,
        name5: null,
        name6: null,
        name7: null,
        name8: null,
        name9: null,
        name10: null
      }
    }
  },

  mounted () {
    this.getOtherList()
  },

  methods: {
    // 选择当前页面显示多少条数据的选择框发生改变
    handleSizeChange (e) {
      this.pageSize = e
      this.getOtherList()
    },
    // 分页改变 e点击的页码  用户手动输入了页面然后go
    handleCurrentChange (e) {
      // console.log('当前页码', e)
      this.pageindex = e - 1
      this.getOtherList()
    },
    // 搜索
    onSubmit () {
      this.getOtherList()
    },
    getOtherList () {
      let query = {
        pageIndex: this.pageindex,
        pageSize: this.pageSize,
        type: 12
      }
      getOtherLists(query).then(res => {
        console.log('获取到的首页标题', res)
        this.tableData = res.data.map(item => {
          item.text = JSON.parse(item.text)
          return item
        })
        // this.tableData = res.data
        this.total = res.pageTotal
      })
    },
    // 格式化时间
    parseTime (time) {
      return parseTime(time)
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
      // 获取text中的json字段
      this.indexName.name1 = thisBean.text.name1
      this.indexName.name2 = thisBean.text.name2
      this.indexName.name3 = thisBean.text.name3
      this.indexName.name4 = thisBean.text.name4
      this.indexName.name5 = thisBean.text.name5
      this.indexName.name6 = thisBean.text.name6
      this.indexName.name7 = thisBean.text.name7
      this.indexName.name8 = thisBean.text.name8
      this.indexName.name9 = thisBean.text.name9
      this.indexName.name10 = thisBean.text.name10
      this.putForm.type = 12
    },
    putThis (data) {
      data.text = this.indexName
      console.log(data)
      putOther(data).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.putView = false
        this.getOtherList()
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
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.blockpage {
  padding-top: 2%;
}
</style>
