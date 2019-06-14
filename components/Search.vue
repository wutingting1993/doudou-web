<template>
  <el-row class="demo-autocomplete">
    <el-autocomplete
      class="inline-input"
      size="small"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect">
      <el-select v-model="form.name" slot="prepend" placeholder="请选择订单状态" size="small" value="1">
        <el-option v-model="form.name" label="订单号" value="1"/>
        <el-option label="入住人" value="2"/>
        <el-option label="电话号码" value="3"/>
        <el-option label="证件号" value="4"/>
        <el-option label="入住人" value="5"/>
      </el-select>
      <el-button slot="append" icon="el-icon-search" size="small"/>
    </el-autocomplete>

    <span class="demonstration">订单状态</span>
    <el-select placeholder="请选择订单状态" size="small" value="1">
      <el-option label="check in" value="1"/>
      <el-option label="check out" value="2"/>
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
    <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
  </el-row>
</template>
<script>
  import commonMixin from '../mixins/common';

  var indexAutoComplate = require('../mock/indexAutoComplate.json');

  export default {
    mixins: [commonMixin],
    data() {
      return {
        searchValues: [],
        form: {
          name: null
        }
      }
    }
    ,
    mounted() {
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

  .el-input-group__append, .el-input-group__prepend {
    background-color: #ffffff;
  }

  .el-input--suffix {
    width: 100px;
  }

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
