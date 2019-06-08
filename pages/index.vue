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
        show-summary
        :summary-method="getSummaries"
        :cell-class-name="tableColClassName"
        :span-method="arraySpanMethod"
        class="default-table"
        @cell-click="dialogTableVisible = true">
        <el-table-column v-for="item in showColumns"
                         :prop="item.field"
                         :label="item.title"
                         fixed="left">
          <template scope="scope">
            <div v-if="item.field !== 'type' && scope.row[item.field]" @click="dialogTableVisible = true" v-html="scope.row[item.field].value">
            </div>
            <div v-else-if="item.field === 'type'" v-html="scope.row[item.field]" style="min-height: 59px"></div>
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
    <div>
      <dashboard-echarts/>
    </div>
  </div>
</template>

<script>
  import DashboardEcharts from '~/components/DashboardEcharts'
  import {pickerOptions} from '../assets/js/default';
  import Axios from 'axios';

  var rowData = require('../mock/indexRows.json');
  var tableHeaders = require('../mock/indexHeaders.json');
  var indexAutoComplate = require('../mock/indexAutoComplate.json');
  export default {
    components: {
      DashboardEcharts
    },
    data() {
      return {
        blocControlClass: "el-icon-caret-bottom",
        blocControlText: '显示Chart',
        restaurants: [],
        state1: '',
        state2: '',
        value1: '',
        value2: '',
        pickerOptions: {},
        currentPage: 1,
        pageSize: 7,
        totalCount: 100,
        tableHeight: 0,
        dialogTableVisible: false,
        showData: [],
        columns: [],
        showColumns: []
      }
    }
    ,
    mounted() {
      // this.tableHeight = window.innerHeight - this.$refs.topictable.$el.offsetTop * 2 - 150;
      this.getHeaders();
      this.getRows();
      this.pickerOptions = pickerOptions();
      this.totalCount = this.columns.length;
      this.restaurants = this.loadAll();
    }
    ,
    methods: {
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
          this.showColumns = [{field: 'type', title: '房型'}].concat(this.columns.splice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage));
        }).catch((error) => {
          console.log(error)
          this.columns = [];
        });
        console.log(this.columns)
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      }
      ,
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      }
      ,
      loadAll() {
        return indexAutoComplate;
      }
      ,
      handleSelect(item) {
        console.log(item);
      }
      ,
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'warning-row';
        }
        return '';
      }
      ,
      tableColClassName({row, column, rowIndex, columnIndex}) {
        if (columnIndex !== 0 && row[column.property]) {
          var status = this.showData[rowIndex][column.property].status;
          if (status === 'leave') {
            return 'leave-cell';
          } else if (status === 'check-in') {
            return 'check-in-cell';
          }
          return 'default-cell';
        }
      }
      ,
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex !== 0 && row[column.property]) {
          var spanCols = this.showData[rowIndex][column.property].colSpan;
          if (spanCols > 1) {
            return [1, spanCols];
          }
        }
      },
      opCheckIn(row, column, cell, event) {
        dialogTableVisible = true;
      },
      getSummaries(param) {
        const sums = []
        this.showColumns.forEach((column, index) => {
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
