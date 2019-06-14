<template>
  <div>
    <div class="container">
      <div class="block" style="padding-bottom: 50px">
        <search/>
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
  import Search from '../components/Search';

  var rowData = require('../mock/getOrderList.json');
  var allFields = require('../mock/orderTableHeaders.json');
  var showFields = require('../mock/orderFields.json');
  var indexAutoComplate = require('../mock/indexAutoComplate.json');

  export default {
    mixins: [commonMixin],
    components: {Search},
    data() {
      return {
        searchValues: [],
        tableData: [],
        showColumns: [],
        allColumns: [],
        form: {
          name: null
        }
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
</style>
