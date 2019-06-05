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
      <div style="align-items: center">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column v-for="item in columns"
                           :prop="item.field"
                           :label="item.title"
                           :span-method="arraySpanMethod">
            <template scope="scope">
              <el-button type="text" @click="dialogTableVisible = true" v-text="scope.row[item.field]"/>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog title="房间信息" :visible.sync="dialogTableVisible">
        <el-table title="房间信息">

        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
        tableData: [
          {"type": "6-2801 三室一厅", "time": "赵伟",},
          {"type": "6-2802 两室一厅", "time": "李伟",},
          {"type": "6-2803 两室一厅", "time5": "吴伟"},
          {"type": "6-2804 一室一厅", "time": "周伟", "colspan": 3}
        ],
        columns: [
          {field: 'type', title: '房型', titleAlign: 'center', columnAlign: 'left', isResize: true},
          {field: 'time', title: '05-01', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time2', title: '05-02', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time3', title: '05-03', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time4', title: '05-04', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time5', title: '05-05', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time6', title: '05-06', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time7', title: '05-07', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true},
          {field: 'time8', title: '05-08', titleAlign: 'center', columnAlign: 'center', isResize: true}
        ]
      }
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        var tableData = [
          {"type": "6-2801 三室一厅", "time": "赵伟",},
          {"type": "6-2802 两室一厅", "time": "李伟",},
          {"type": "6-2803 两室一厅", "time5": "吴伟"},
          {"type": "6-2804 一室一厅", "time": "周伟", "colspan": 3}
        ]
        var spanCols = [];
        for (i in  tableData[rowIndex].colspan) {
          spanCols[i] = [columnIndex++]
        }
        return spanCols;
      }
    }
  }

</script>

<style>
  /*.cell {*/
  /*background-color: #F56C6C;*/
  /*color: #333;*/
  /*}*/

  .container {
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
</style>
