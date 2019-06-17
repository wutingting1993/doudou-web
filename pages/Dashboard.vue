<template>
  <div>
    <dashboard-echarts/>
  </div>
</template>

<script>
  import DashboardEcharts from '../components/DashboardEcharts'
  import CommonMixin from '../mixins/common';
  import Axios from 'axios';

  var rowData = require('../mock/RoomStateRows.json');
  var tableHeaders = require('../mock/RoomStateHeaders.json');
  var indexAutoComplate = require('../mock/indexAutoComplate.json');
  export default {
    mixins:[CommonMixin],
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
        currentPage: 1,
        pageSize: 7,
        totalCount: 100,
        tableHeight: 0,
        dialogTableVisible: false,
        showData: [],
        columns: [],
        firstColumn: []
      }
    }
    ,
    mounted() {
      // this.tableHeight = window.innerHeight - this.$refs.topictable.$el.offsetTop * 2 - 150;
      this.getHeaders();
      this.getRows();
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
          this.firstColumn = [{field: 'type', title: '房型'}].concat(this.columns.splice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage));
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
      roomStateTableSpan({row, column, rowIndex, columnIndex}) {
        if (columnIndex !== 0 && row[column.property]) {
          var spanCols = this.showData[rowIndex][column.property].rowSpan;
          if (spanCols > 1) {
            return [1, spanCols];
          }
        }
      },
      getSummaries(param) {
        const sums = []
        this.firstColumn.forEach((column, index) => {
          if (Dashboard === 0) {
            sums[Dashboard] = '总价';
            return;
          }
          sums[Dashboard] = 1000 + Dashboard + ' 元';
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
