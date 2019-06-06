<template>
  <div>
    <div class="container">
      <el-button-group>
        <el-button type="primary" icon="el-icon-edit"/>
        <el-button type="primary" icon="el-icon-share"/>
        <el-button type="danger" icon="el-icon-delete"/>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
      </el-button-group>
      <div style="align-items: center">
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="date"
            label="房间号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="房型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="订单号">
          </el-table-column>
          <el-table-column
            prop="address"
            label="入住人">
          </el-table-column>
          <el-table-column
            prop="address"
            label="入住时间">
          </el-table-column>
          <el-table-column
            prop="address"
            label="退房时间">
          </el-table-column>
          <el-table-column
            prop="address"
            label="是否续住">
          </el-table-column>
          <el-table-column
            prop="address"
            label="平台">
          </el-table-column>
          <el-table-column
            prop="address"
            label="平台金额">
          </el-table-column>
          <el-table-column
            prop="address"
            label="入账金额">
          </el-table-column>
          <el-table-column
            prop="address"
            label="是否离店">
          </el-table-column>
          <el-table-column
            prop="address"
            label="是否打扫">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    }
  }
</script>

<style>
  .container {
    margin: 50px 50px 50px 50px;
    width: 80%;
    height: 100%;
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
