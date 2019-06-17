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
            @select="handleSelect">
          </el-autocomplete>
          <span class="demonstration">电话</span>
          <el-autocomplete
            class="inline-input"
            v-model="state1"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect">
          </el-autocomplete>
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
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button-group>
            <el-button type="primary" icon="el-icon-plus" @click="openAddRoomDialog">新增</el-button>
            <el-button type="warning" icon="el-icon-edit" @click="openEditRoomDialog">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="openConfirmDialog">删除</el-button>
          </el-button-group>
        </el-row>
      </div>
      <div class="container">
        <el-table :data="showData"
                  ref="platformTable"
                  border
                  :span-method="roomStateTableSpan"
                  :cell-class-name="payStatus"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"/>
          <el-table-column v-for="item in columns"
                           :prop="item.field"
                           :label="item.title"
                           v-bind:key="item.field">
            <template slot-scope="scope">
              <div v-if="item.field==='price' || item.field==='rentTime'" v-html="scope.row['rentInfo'][item.field]"></div>
              <div v-else v-html="scope.row[item.field]" style="min-height: 59px"></div>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button @click="openAccountDialog" type="text" size="small">
                账户信息
              </el-button>
              <el-button v-if="scope.row['hasRoomConfs']===true" @click="openRoomDialog" type="text" size="small">
                房源配套
              </el-button>
              <el-button v-else @click="openSetRoomDialog" type="text" size="small">
                设置配套
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <room-owner-account-info-pop ref="account-dialog" :room-no="currentRoomNo"/>
        <room-configuration-detail-pop ref="room-dialog" :room-no="currentRoomNo"/>
        <set-room-configurations-pop ref="set-room-dialog" :room-no="currentRoomNo"/>
        <add-room-pop ref="add-room-dialog"/>
        <add-room-pop ref="edit-room-dialog"/>
      </div>
    </div>
  </div>

</template>

<script>
  import RoomOwnerAccountInfoPop from '../components/RoomOwnerAccountInfoPop';
  import RoomConfigurationDetailPop from '../components/RoomConfigurationDetailPop';
  import AddRoomPop from '../components/AddRoomPop';
  import SetRoomConfigurationsPop from '../components/SetRoomConfigurationsPop';
  import Axios from 'axios';
  import rentMixin from '../mixins/rent';
  import commonMixin from '../mixins/common';

  var appData = require('../mock/rent.json');
  var tableHeaders = require('../mock/rentTableHeaders.json')
  export default {
    mixins: [rentMixin, commonMixin],
    components: {
      RoomOwnerAccountInfoPop,
      RoomConfigurationDetailPop,
      AddRoomPop,
      SetRoomConfigurationsPop
    },
    data() {
      return {
        currentRoomNo: '6-2801',
        restaurants: [],
        state1: '',
        state2: '',
        value1: '',
        value2: '',
        dialogFormVisible: false,
        showData: [],
        columns: [],
        multipleSelection: [],
        formLabelWidth: '120px',
        form: {
          platformName: '',
          comment: '',
          type: ''
        }
      }
    },

    mounted() {
      this.columns = this.getHeaders();
      this.showData = this.getRows();
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
      roomStateTableSpan({row, column, rowIndex, columnIndex}) {
        if (['rentTime', 'price'].indexOf(column.property) === -1) {
          // 用于设置合并开始的行号，rowspan 不为 0，不是第一行时, 则该行需要向下合并
          if (column.rowspan !== 0) {
            return {
              rowspan: row.rowspan, // 要合并的行数
              colspan: 1
            }
          } else {
            return {
              rowspan: 0, // column.rowspan === 0 隐藏该单元格
              colspan: 0
            }
          }
        }
      },
      success() {
        this.roomDialogTableVisible = false
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
        return this.roomDialogTableVisible;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }, openAccountDialog() {
        this.$refs['account-dialog'].open();
      }, openRoomDialog() {
        this.$refs['room-dialog'].open();
      }, openAddRoomDialog() {
        this.$refs['add-room-dialog'].open();
      }, openEditRoomDialog() {
        this.$refs['edit-room-dialog'].open();
      }, openSetRoomDialog() {
        this.$refs['set-room-dialog'].open();
      }
    }
  }
</script>

<style>
  @import "../assets/css/default.css";
  @import "../assets/css/rent.css";
</style>
