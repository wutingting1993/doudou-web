<template>
  <div>
    <!--<el-button-group>-->
    <!--<el-button type="primary">上传<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->
    <!--<el-button type="primary" icon="el-icon-edit">编辑</el-button>-->
    <!--<el-button type="danger" icon="el-icon-delete">删除</el-button>-->
    <!--<el-button type="primary" icon="el-icon-search">搜索</el-button>-->
    <!--</el-button-group>-->
    <!--<br/>-->
    <!--<el-button-group>-->
    <!--<el-button type="primary">上传<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->
    <!--<el-button type="primary" icon="el-icon-edit">编辑</el-button>-->
    <!--<el-button type="danger" icon="el-icon-delete">删除</el-button>-->
    <!--</el-button-group>-->
    <div class="container">
      <!--:header-cell-style=""-->
      <el-table
        :data="tableData"
        ref="topictable"
        :height="tableHeight"
        border
        :cell-class-name="tableColClassName"
        class="dashboard-table"
        @cell-click="dialogTableVisible = true">
        <el-table-column v-for="item in columns"
                         :prop="item.field"
                         :label="item.title"
                         :span-method="arraySpanMethod">
          <template scope="scope">
            <div v-if="item.field !== 'type' && scope.row[item.field]" @click="dialogTableVisible = true" v-text="scope.row[item.field]" class="check-in-info">
            </div>
            <div v-else-if="item.field === 'type'" v-text="scope.row[item.field]"></div>
            <div v-else @click="dialogTableVisible = true" v-text=" "></div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :hide-on-single-page="true"
        :total="totalCount"
        :current-page="currentPage"
        :page-size="pageSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage: 4,
        pageSize: 2,
        totalCount: 100,
        tableHeight: 0,
        dialogTableVisible: false,
        tableData: [
          {"type": "6-2801 三室一厅", "time1": "赵伟", "time4": "赵伟", "time2": "赵伟"},
          {"type": "6-2802 两室一厅", "time1": "李伟",},
          {"type": "6-2803 两室一厅", "time5": "吴伟"},
          {"type": "6-2804 一室一厅", "time1": "张三", "colspan": 3},
          {"type": "6-2805 一室一厅", "time7": "李四", "colspan": 3},
          {"type": "6-2806 一室一厅", "time3": "王五", "colspan": 3},
          {"type": "6-2807 一室一厅", "time4": "路六", "colspan": 3},
          {"type": "6-2808 一室一厅", "time2": "周伟", "colspan": 3}
        ],
        columns: [
          {field: 'type', title: '房型'},
          {field: 'time1', title: '05-01'},
          {field: 'time2', title: '05-02'},
          {field: 'time3', title: '05-03'},
          {field: 'time4', title: '05-04'},
          {field: 'time5', title: '05-05'},
          {field: 'time6', title: '05-06'},
          {field: 'time7', title: '05-07'}
        ]
      }
    },

    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.topictable.$el.offsetTop * 2 - 250;
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'warning-row';
        }
        return '';
      },
      tableColClassName({row, column, rowIndex, columnIndex}) {
        if (columnIndex !== 0 && row[column.property]) {
          return 'success-cell';
        }
      },
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        // var tableData = [
        //   {"type": "6-2801 三室一厅", "time": "赵伟",},
        //   {"type": "6-2802 两室一厅", "time": "李伟",},
        //   {"type": "6-2803 两室一厅", "time5": "吴伟"},
        //   {"type": "6-2804 一室一厅", "time": "周伟", "colspan": 3}
        // ]
        // var spanCols = [];
        // for (i in  tableData[rowIndex].colspan) {
        //   spanCols[i] = [columnIndex++]
        // }
        return spanCols;
      }, opCheckIn(row, column, cell, event) {
        dialogTableVisible = true;
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
    align-items: left;
    text-align: left;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-table .warning-cell {
    background: oldlace;
  }

  .el-table .success-cell {
    background: #f0f9eb;
  }
</style>
