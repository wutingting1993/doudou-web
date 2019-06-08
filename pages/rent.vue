<template>
  <div>
    <div class="container">
      <div class="block" style="padding-bottom: 50px">
        <el-row class="demo-autocomplete">
          <span class="demonstration">房东</span>
          <el-autocomplete
            class="inline-input"
            v-model="state1"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
          <span class="demonstration">租期</span>
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
      <div style="text-align: center">
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
          <el-button type="warning" icon="el-icon-edit" @click="dialogFormVisible = true">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="open">删除</el-button>
        </el-button-group>
      </div>
      <div class="container">
        <el-table
          :data="showData"
          ref="platformTable"
          border
          :span-method="arraySpanMethod"
          :cell-class-name="payStatus"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection"/>
          <el-table-column v-for="item in columns"
                           :prop="item.field"
                           :label="item.title">
            <template scope="scope">
              <div v-if="item.field==='price' || item.field==='rentTime'" v-html="scope.row['rentInfo'][item.field]"></div>
              <div v-else v-html="scope.row[item.field]" style="min-height: 59px"></div>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
                账户信息
              </el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
                房间配套
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog title="新增平台" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="平台名称" :label-width="formLabelWidth">
            <el-input v-model="form.platformName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-select v-model="form.type" placeholder="请选择活动区域">
              <el-option label="线上" value="shanghai"></el-option>
              <el-option label="线下" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.comment" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="success">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
  import {spanRow, payStatus, openDailog} from '../assets/js/rent';
  import {pickerOptions} from '../assets/js/default';
  import Axios from 'axios';

  var appData = require('../mock/rent.json');
  var tableHeaders = require('../mock/rentTableHeaders.json')
  export default {
    data() {
      return {
        restaurants: [],
        state1: '',
        state2: '',
        value1: '',
        value2: '',
        pickerOptions: {},
        tableHeight: 0,
        dialogFormVisible: false,
        showData: [],
        columns: [],
        multipleSelection: [],
        formLabelWidth: '120px',
        form: {
          platformName: '',
          comment: '',
          type: ''
        },
        id: 4
      }
    },

    mounted() {
      this.columns = this.getHeaders();
      this.showData = this.getRows();
      this.pickerOptions = pickerOptions();
    },
    methods: {
      getRows() {
        Axios.get('/rent-data').then((response) => {
          this.showData = appData;
        }).catch((error) => {
          this.showData = [];
          console.log(error)
        });
      },
      getHeaders() {
        Axios.get('/rent-header').then((response) => {
          this.columns = tableHeaders;
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
      handleSelect(item) {
        console.log(item);
      }
      ,
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        return spanRow(row, column, rowIndex, columnIndex, ['rentTime', 'price']);
      },
      success() {
        this.dialogFormVisible = false
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
        this.showData = this.showData.concat([{roomNo: this.id, "type": "线上", "platformName": "途家" + this.id, 'comment': "this is desc"}]);
        this.id++;
        return this.dialogFormVisible;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      open() {
        openDailog();
      },
      payStatus({row, column, rowIndex, columnIndex}) {
        return payStatus(row, column);
      }
    }
  }
</script>

<style>
  @import "../assets/css/default.css";
  @import "../assets/css/rent.css";
</style>
