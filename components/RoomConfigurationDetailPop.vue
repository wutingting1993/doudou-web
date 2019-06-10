<template>
  <el-dialog :title="title" :visible.sync="accountDialogTableVisible">
    <div class="block" style="padding-bottom: 50px">
      <el-row class="demo-autocomplete">
        <span class="demonstration">名称</span>
        <el-autocomplete v-model="form.name" size="small"
                         class="inline-input small"
                         placeholder="请输入名称"
                         @select="handleSelect">
        </el-autocomplete>
        <span class="demonstration">属主</span>
        <el-select v-model="form.owner" placeholder="请选择属主" size="small">
          <el-option label="莱恩" value="1"></el-option>
          <el-option label="房东" value="2"></el-option>
        </el-select>
        <span class="demonstration">状态</span>
        <el-select v-model="form.status" placeholder="请选择状态" size="small">
          <el-option label="已安装" value="1"></el-option>
          <el-option label="未安装" value="2"></el-option>
          <el-option label="已废弃" value="3"></el-option>
        </el-select>
        <span class="demonstration">标签</span>
        <el-autocomplete v-model="form.labels" size="small"
                         class="inline-input"
                         placeholder="请输入内容"
                         @select="handleSelect">
        </el-autocomplete>
        <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
      </el-row>
    </div>
    <el-table
      :data="showData"
      ref="topictable"
      border
      show-summary
      :cell-class-name="setUpStatus"
      class="default-table">
      <el-table-column v-for="item in columns"
                       :prop="item.field"
                       :label="item.title"
                       v-bind:key="item.field"
                       fixed="left"
                       :formatter='formatterLabels'>
        <template slot-scope="scope">
          <div v-html="formatterLabels(scope.row, scope.column)"></div>
        </template>

      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :hide-on-single-page="true"
      :total="totalCount"
      :current-page="currentPage"
      :page-size="pageSize"
      align="right">
    </el-pagination>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import Axios from 'axios';
  import rentMixin from '../mixins/rent';
  import commonMixin from '../mixins/common';

  var appData = require('../mock/RoomConfigurations.json');
  var tableHeaders = require('../mock/RoomConfigurationsHeaders.json');
  export default {
    mixins: [rentMixin, commonMixin],
    data() {
      return {
        title: '房源配套',
        accountDialogTableVisible: false,
        formLabelWidth: '120px',
        totalCount: 0,
        pageSize: 10,
        currentPage: 1,
        showData: [],
        columns: [],
        form: {
          owner: '',
          status: ''
        }
      }
    },
    mounted() {
      this.title = this.roomNo + " " + this.title;
      this.getHeaders();
      this.getRows();
    },
    methods: {
      getRows() {
        Axios.get('/rent-data').then((response) => {
          this.showData = appData;
          this.totalCount = this.showData.length;
        }).catch((error) => {
          console.log(error)
        });
      }, getHeaders() {
        Axios.get('/rent-data').then((response) => {
          this.columns = tableHeaders;
        }).catch((error) => {
          console.log(error)
        });
      },
      close() {
        this.accountDialogTableVisible = false;
      },
      open() {
        this.accountDialogTableVisible = true;
      },
      success() {
        this.accountDialogTableVisible = false;
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
        return this.accountDialogTableVisible;
      }
    },
    props: {
      roomNo: {
        type: String,
        default: ""
      }
    }
  }
</script>

<style>
  .el-tag {
    margin: 5px;
  }
</style>
