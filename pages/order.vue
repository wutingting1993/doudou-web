<template>
  <div>
    <div class="container">
      <div class="block" style="padding-bottom: 50px">
        <el-row class="demo-autocomplete">
          <span class="demonstration">订单号</span>
          <el-autocomplete
            class="inline-input"
            size="small"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect">
          </el-autocomplete>

          <span class="demonstration">入住人</span>
          <el-autocomplete
            class="inline-input"
            size="small"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect">
          </el-autocomplete>

          <span class="demonstration">电话号码</span>
          <el-autocomplete
            class="inline-input"
            size="small"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect">
          </el-autocomplete>

          <span class="demonstration">证件号</span>
          <el-autocomplete
            class="inline-input"
            size="small"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect">
          </el-autocomplete>

          <span class="demonstration">订单状态</span>
          <el-select placeholder="请选择订单状态" size="small">
            <el-option label="check in" value="1"></el-option>
            <el-option label="check out" value="2"></el-option>
          </el-select>

          <span class="demonstration">入住时间</span>
          <el-date-picker
            size="small"
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
        :data="tableData"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item v-for="item in allColumns"
                            :prop="item.field"
                            :label="item.title"
                            v-bind:key="item.field">
                <span v-text="props.row[item.field]"></span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column v-for="item in showColumns"
                         :prop="item.field"
                         :label="item.title"
                         v-bind:key="item.field">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

  import commonMixin from '../mixins/common';

  var rowData = require('../mock/getOrderList.json');
  var allFields = require('../mock/orderTableHeaders.json');
  var showFields = require('../mock/orderFields.json');
  var indexAutoComplate = require('../mock/indexAutoComplate.json');

  export default {
    mixins: [commonMixin],
    data() {
      return {
        searchValues: [],
        tableData: [],
        showColumns: [],
        allColumns: []
      }
    }
    ,
    mounted() {
      this.tableData = rowData;
      this.showColumns = showFields;
      this.allColumns = allFields;
      this.searchValues = indexAutoComplate;
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.searchValues;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      }
    }
  }
</script>

<style>
  @import "../assets/css/default.css";

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
