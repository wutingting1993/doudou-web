<template>
  <div>
    <div class="container">
      <!--:header-cell-style=""-->
      <div class="block" style="padding-bottom: 20px">
        <el-row class="demo-autocomplete">
          <el-date-picker size="small"
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
          <el-autocomplete size="small"
                           class="inline-input"
                           v-model="state1"
                           :fetch-suggestions="querySearch"
                           placeholder="请输入内容"
                           @select="handleSelect"
          ></el-autocomplete>
        </el-row>

      </div>
      <el-table
        :data="showData"
        ref="roomStateTable"
        :height="tableHeight"
        border
        show-summary
        :summary-method="getSummaries"
        :span-method="roomStateTableSpan"
        class="default-table"
        :cell-class-name="tableColClassName"
        @cell-click="cellClick">
        <el-table-column v-for="item in firstColumn"
                         :prop="item.field"
                         :label="item.title"
                         v-bind:key="item.field"
                         fixed="left">
          <!--
                         fixed="left"-->
          <template slot-scope="scope">
            <div v-html="scope.row[item.field]" style="min-height: 59px"></div>
          </template>
        </el-table-column>
        <el-table-column v-for="(item, index) in columns"
                         :prop="item.field"
                         :label="item.title"
                         v-bind:key="item.field">
          <!--
                         fixed="left"-->
          <template slot-scope="scope">
            <div v-if="item.field !== 'type' && scope.row[item.field]" v-html="scope.row[item.field].value">
            </div>
            <div v-else-if="item.field === 'type'" v-html="scope.row[item.field]" style="min-height: 59px"></div>
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
  import CommonMixin from '../mixins/common';
  import RoomState from '../mixins/RoomState';
  import Axios from 'axios';

  var rowData = require('../mock/RoomStateRows.json');
  var tableHeaders = require('../mock/RoomStateHeaders.json');
  var indexAutoComplate = require('../mock/indexAutoComplate.json');


  export default {
    mixins: [CommonMixin, RoomState],
    components: {},
    data() {
      return {
        blocControlClass: "el-icon-caret-bottom",
        blocControlText: '显示Chart',
        restaurants: [],
        state1: '',
        state2: '',
        value1: '',
        value2: '',
        currentPage: 1,
        pageSize: 100,
        totalCount: 100,
        tableHeight: 0,
        dialogTableVisible: false,
        showData: [],
        columns: [],
        firstColumn: []
      }
    },
    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.roomStateTable.$el.offsetTop * 2;
      this.getHeaders();
      this.getRows();
      this.totalCount = this.columns.length;
      this.restaurants = this.loadAll();
    },
    methods: {
      cellClick() {
        this.dialogTableVisible = true
      },
      getRows() {
        Axios.get('/row-data').then((response) => {
          this.showData = rowData;
        }).catch((error) => {
          this.showData = [];
          console.log(error)
        });
      },
      getHeaders() {
        Axios.get('/rent-header').then((response) => {
          this.columns = tableHeaders;
          // this.firstColumn = [{field: 'type', title: '房型'}].concat(this.columns.splice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage));
          this.firstColumn = [{field: 'type', title: '房型'}, {field: 'roomNo', title: '房号'}];
        }).catch((error) => {
          console.log(error)
          this.columns = [];
        });
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      tableColClassName({row, column, rowIndex, columnIndex}) {
        if (columnIndex > 1 && row[column.property]) {
          var status = this.showData[rowIndex][column.property].status;
          if (status === 'leave') {
            return 'leave-cell';
          } else if (status === 'check-in') {
            return 'check-in-cell';
          }
          return 'default-cell';
        }
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return indexAutoComplate;
      },
      roomStateTableSpan({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
          return RoomState.methods.rowSpan({row, column, rowIndex, columnIndex});
        } else if (row[column.property]) {
          return RoomState.methods.colSpan({row, column, rowIndex, columnIndex}, this.showData)
        }
      },
      getSummaries(param) {
        const sums = []
        this.firstColumn.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          sums[index] = 1000 + index + ' 元';
        });

        return sums;
      }
    }
  }
</script>

<style>
  @import "../assets/css/default.css";

  .el-table--enable-row-hover .el-table__body tr > td:hover {
    border-style: solid;
    border-color: #41b883;
    border-width: 3px;
    background: top !important;
  }

  /*.el-table :hover {*/
  /*  background-color: currentColor;*/
  /*}*/
  .demo-block-control {
    border-top: 1px solid #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;
  }
</style>
