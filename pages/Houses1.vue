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
        <!--                  :span-method="roomStateTableSpan"-->
        <el-table :data="roomList"
                  ref="roomTable"
                  :cell-class-name="payStatus"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"/>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item v-for="item in roomFields"
                              :prop="item.field"
                              :label="item.title"
                              v-bind:key="item.field">
                  <span v-text="props.row[item.field]"></span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column v-for="item in columns"
                           :prop="item.field"
                           :label="item.title"
                           v-bind:key="item.field">
            <template slot-scope="scope">
              <div v-if="item.field==='rentPrice' || item.field==='rentTime'"
                   v-html="scope.row['rentInfos'][item.field]"></div>
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

  const roomFields = require('../mock/roomFields.json');
  const appData = require('../mock/rent.json');
  const tableHeaders = require('../mock/roomTableHeaders.json')
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
        dialogFormVisible: false,
        roomFields: [],
        roomList: [],
        columns: [],
        multipleSelection: [],
        deleteFlag: false,
        currentRoomNo: '6-2801',
        restaurants: [],
        state1: '',
        state2: '',
        value1: '',
        value2: '',
        formLabelWidth: '120px',
        form: {
          roomName: '',
          description: '',
          type: ''
        }
      }
    },

    mounted() {
      this.columns = tableHeaders;
      this.roomFields = roomFields;
      this.getRooms();
      debugger
    },
    methods: {
      getRooms() {
        Axios.get("http://localhost:8080/rooms").then((response) => {
          this.roomList = response.data.content;
        }).catch((error) => {
          this.roomList = [];
          console.log(error)
        });
      },
      showEditDialog() {
        this.dialogFormVisible = true;
        this.modelTitle = '编辑平台';
        Axios.get("http://localhost:8080/rooms/" + this.multipleSelection[0].id).then((response) => {
          this.form = response.data.content;
        }).catch((error) => {
          commonMixin.methods.showErrorDialog(this, error);
        });
      },
      showAddDialog() {
        this.dialogFormVisible = true;
        this.modelTitle = '新增平台';
        this.form = {};
      },
      addRooms() {
        Axios.post("http://localhost:8080/rooms", this.form).then((response) => {
          this.dialogFormVisible = false;
          commonMixin.methods.successMessage(this);
          this.getRooms();
        }).catch((error) => {
          commonMixin.methods.showErrorDialog(this, error);
        });
      },
      updateRooms: function () {
        Axios.patch("http://localhost:8080/rooms/" + this.multipleSelection[0].id, this.form).then((response) => {
          this.dialogFormVisible = false;
          commonMixin.methods.successMessage(this);
          this.getRooms();
        }).catch((error) => {
          commonMixin.methods.showErrorDialog(this, error);
        });
      },
      saveRooms() {
        if (this.modelTitle === '新增平台') {
          this.addRooms();
        } else {
          this.updateRooms();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.deleteFlag = val.length !== 1;
      },
      deleteRooms() {
        commonMixin.methods.showConfirmDialog(this, '删除房源【' + this.multipleSelection[0].name + '】是否继续?').then(() => {
            Axios.delete("http://localhost:8080/rooms/" + this.multipleSelection[0].id).then((response) => {
              commonMixin.methods.successMessage(this);
              this.getRooms();
            }).catch((error) => {
              commonMixin.methods.showErrorDialog(this, error);
            });
          }
        ).catch(() => {
          commonMixin.methods.cancelMessage(this);
        });
      },
      getRows() {
        Axios.get('/rent-data').then((response) => {
          this.showData = appData;
        }).catch((error) => {
          this.showData = [];
          console.log(error)
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
        if (['rentTime', 'rentPrice'].indexOf(column.property) === -1) {
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
