<template>
  <div>
    <div style="text-align: center">
      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
        <el-button type="warning" icon="el-icon-edit" @click="dialogFormVisible = true">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="open">删除</el-button>
      </el-button-group>
    </div>
    <div class="container">
      <el-table
        :data="showData"
        ref="platformTable"
        border
        :span-method="arraySpanMethod"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection"/>
        <el-table-column v-for="item in columns"
                         :prop="item.field"
                         :label="item.title">
          <template scope="scope">
            <div v-if="item.field==='price' || item.field==='rentTime'" v-html="scope.row['rentInfo'][item.field]"></div>
            <div v-else v-html="scope.row[item.field]" style="min-height: 59px"></div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="新增平台" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="平台名称" :label-width="formLabelWidth">
          <el-input v-model="form.platformName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择活动区域">
            <el-option label="线上" value="shanghai"></el-option>
            <el-option label="线下" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.comment" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="success">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableHeight: 0,
        dialogFormVisible: false,
        showData: [
          {
            "roomNo": "6-2801",
            "type": "一室一厅",
            "owner": "张三",
            "ownerPhone":
              "18380446400",
            "contact": "张三",
            "contactPhone": "18380446400",
            'comment': "this is desc",
            'rentInfo': {
              'rentTime': '2018-01-15<br>2019-01-06',
              'price': '6000',
            },
            'deposit': '6000',
            'payWay': '按月',
            "rowspan": 1 // rowspan 1：表示不合并
          },
          {
            "roomNo": "6-2802",
            "type": "二室一厅",
            "owner": "李四",
            "ownerPhone": "18380446400",
            "contact": "李四",
            "contactPhone": "18380446400",
            'comment': "this is desc",
            'rentInfo': {
              'rentTime': '2018-01-15<br>2019-01-06',
              'price': '7000',
            },
            'deposit': '7000',
            'payWay': '季度',
            'rowspan': 2 // rowspan 2：表示合并下方的1行，共合并2行
          }, {
            "roomNo": "6-2802",
            "type": "二室一厅",
            "owner": "李四",
            "ownerPhone": "18380446400",
            "contact": "李四",
            "contactPhone": "18380446400",
            'comment': "this is desc",
            'rentInfo': {
              'rentTime': '2019-01-16<br>2020-01-06',
              'price': '7500',
            },
            'deposit': '7000',
            'payWay': '季度',
            "rowspan": 0 // rowspan 0：表示已被上面的行合并，该单元格不显示
          },
          {
            "roomNo": "6-2803",
            "type": "三室一厅",
            "owner": "王五",
            "ownerPhone": "18380446400",
            "contact": "王五",
            "contactPhone": "18380446400",
            'comment': "this is desc",
            'rentInfo': {
              'rentTime': '2018-01-15<br>2019-01-06',
              'price': '8000',
            },
            'deposit': '8000',
            'payWay': '半年',
            "rowspan": 1 // rowspan 0：表示已被上面的行合并，该单元格不显示
          }
        ],
        columns: [
          {field: 'roomNo', title: '房号'},
          {field: 'type', title: '房型'},
          {field: 'owner', title: '房东'},
          {field: 'ownerPhone', title: '房东电话'},
          {field: 'contact', title: '联系人'},
          {field: 'contactPhone', title: '联系人电话'},
          {field: 'rentTime', title: '租期'},
          {field: 'price', title: '租金/月'},
          {field: 'deposit', title: '押金'},
          {field: 'payWay', title: '支付方式'},
          {field: 'payAccount', title: '账号详情'},
          {field: 'comment', title: '备注'}
        ],
        multipleSelection: [],
        formLabelWidth: '120px',
        form: {
          platformName: '',
          comment: '',
          type: ''
        },
        id: 4
      }
    },

    mounted() {
    },
    methods: {
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        // 不合并的列的索引
        let arr = [7, 8];
        // 设置要合并的列
        if (arr.indexOf(columnIndex) === -1) {
          // 用于设置合并开始的行号，rowspan 不为 0，不是第一行时, 则该行需要向下合并
          if (column.rowspan !== 0) {
            return {
              rowspan: row.rowspan, // 要合并的行数
              colspan: 1
            }
          } else {
            return {
              rowspan: 0, // column.rowspan === 0 隐藏该单元格
              colspan: 0
            }
          }
        }
      },
      success() {
        this.dialogFormVisible = false
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
        this.showData = this.showData.concat([{roomNo: this.id, "type": "线上", "platformName": "途家" + this.id, 'comment': "this is desc"}]);
        this.id++;
        return this.dialogFormVisible;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }, open() {
        this.$confirm('删除平台, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style>
  .dashboard-table {
    width: 100%;
    height: 100%;
  }

  div > .container {
    margin: 50px 50px 50px 50px;
    justify-content: center;
    text-align: left;
  }

  .el-button-group {
    margin: 0 0 0 50px;
  }
</style>
