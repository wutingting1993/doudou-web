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
      <div class="block" style="padding-bottom: 50px">
        <el-row class="demo-autocomplete">
          <span class="demonstration">入住人</span>
          <el-autocomplete
            class="inline-input"
            v-model="state1"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
          <span class="demonstration">入住时间</span>
          <el-date-picker
            v-model="value2"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            clearable
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-row>

      </div>
      <el-table
        :data="showData"
        ref="topictable"
        :height="tableHeight"
        border
        :cell-class-name="tableColClassName"
        class="dashboard-table"
        @cell-click="dialogTableVisible = true">
        <el-table-column v-for="item in showColumns"
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

      <el-dialog title="房间信息" :visible.sync="dialogTableVisible">
        <el-table title="房间信息">

        </el-table>
      </el-dialog>
      <el-pagination
        background
        layout="prev, pager, next"
        :hide-on-single-page="true"
        :total="totalCount"
        :current-page="currentPage"
        :page-size="pageSize"
        align="right">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

        restaurants: [],
        state1: '',
        state2: '',
        value1: '',
        value2: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        currentPage: 1,
        pageSize: 7,
        totalCount: 100,
        tableHeight: 0,
        dialogTableVisible: false,
        showData: [
          {"type": "6-2801 三室一厅", "time1": "赵伟", "time4": "赵伟", "time2": "赵伟", "time7": "赵伟", "time8": "赵伟"},
          {"type": "6-2802 两室一厅", "time1": "李伟",},
          {"type": "6-2803 两室一厅", "time5": "吴伟"},
          {"type": "6-2804 一室一厅", "time1": "张三", "colspan": 3},
          {"type": "6-2805 一室一厅", "time7": "李四", "colspan": 3},
          {"type": "6-2806 一室一厅", "time3": "王五", "colspan": 3},
          {"type": "6-2807 一室一厅", "time4": "路六", "colspan": 3},
          {"type": "6-2808 一室一厅", "time2": "周伟", "colspan": 3}
        ],
        columns: [
          {field: 'time1', title: '05-01'},
          {field: 'time2', title: '05-02'},
          {field: 'time3', title: '05-03'},
          {field: 'time4', title: '05-04'},
          {field: 'time5', title: '05-05'},
          {field: 'time6', title: '05-06'},
          {field: 'time7', title: '05-07'},
          {field: 'time8', title: '05-08'},
          {field: 'time9', title: '05-09'},
          {field: 'time10', title: '05-10'},
          {field: 'time11', title: '05-11'},
          {field: 'time12', title: '05-12'},
          {field: 'time13', title: '05-13'}
        ],
        showColumns: []
      }
    },

    mounted() {
      // this.tableHeight = window.innerHeight - this.$refs.topictable.$el.offsetTop * 2 - 150;
      this.totalCount = this.columns.length;
      this.showColumns = [{field: 'type', title: '房型'}].concat(this.columns.splice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage));
      this.restaurants = this.loadAll();
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      }, loadAll() {
        return [
          {"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
          {"value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号"},
          {"value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"},
          {"value": "泷千家(天山西路店)", "address": "天山西路438号"},
          {"value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"},
          {"value": "贡茶", "address": "上海市长宁区金钟路633号"},
          {"value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号"},
          {"value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号"}
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
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
