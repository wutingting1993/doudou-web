<template>
  <div>
    <el-button-group>
      <el-button type="primary" icon="el-icon-plus" @click="showAddDialog">新增</el-button>
      <el-button type="warning" icon="el-icon-edit" :disabled="deleteFlag" @click="showEditDialog">
        编辑
      </el-button>
      <el-button type="danger" icon="el-icon-delete" :disabled="deleteFlag" @click="deletePlatform">删除
      </el-button>
    </el-button-group>
    <div class="container">
      <el-table
        :data="platformList"
        ref="platformTable"
        border
        @selection-change="handleSelectionChange">
        <el-table-column type="selection"/>
        <el-table-column v-for="item in columns"
                         :prop="item.field"
                         :label="item.title"
                         v-bind:key="item.field">
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="modelTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="平台名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.platformType" placeholder="请选择活动区域">
            <el-option label="线上" value="ONLINE"></el-option>
            <el-option label="线下" value="OFFLINE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePlatform">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Axios from 'axios';
  import commonMixin from '../mixins/common';

  export default {
    mixins: [commonMixin],
    data() {
      return {
        tableHeight: 0,
        dialogFormVisible: false,
        platformList: [],
        columns: [
          {field: 'id', title: '编号'},
          {field: 'name', title: '平台名称'},
          {field: 'platformTypeName', title: '平台类型'},
          {field: 'description', title: '备注'}
        ],
        multipleSelection: [],
        formLabelWidth: '120px',
        form: {
          name: '',
          description: '',
          platformType: ''
        },
        deleteFlag: true,
        modelTitle: '新增平台'
      }
    },

    mounted() {
      this.getPlatforms();
    },
    methods: {
      getPlatforms() {
        Axios.get("http://localhost:8080/platforms").then((response) => {
          this.platformList = response.data.content;
        }).catch((error) => {
          this.platformList = [];
          console.log(error)
        });
      },
      showEditDialog() {
        this.dialogFormVisible = true;
        this.modelTitle = '编辑平台';
        Axios.get("http://localhost:8080/platforms/" + this.multipleSelection[0].id).then((response) => {
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
      addPlatform() {
        Axios.post("http://localhost:8080/platforms", this.form).then((response) => {
          if (response.status === 201) {
            commonMixin.methods.successMessage(this);
            this.getPlatforms();
          }
        }).catch((error) => {
          commonMixin.methods.showErrorDialog(this, error);
        });
      },
      updatePlatform: function () {
        Axios.patch("http://localhost:8080/platforms/" + this.multipleSelection[0].id, this.form).then((response) => {
          commonMixin.methods.successMessage(this);
          this.getPlatforms();
        }).catch((error) => {
          commonMixin.methods.showErrorDialog(this, error);
        });
      },
      savePlatform() {
        this.dialogFormVisible = false;
        if (this.modelTitle === '新增平台') {
          this.addPlatform();
        } else {
          this.updatePlatform();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.deleteFlag = val.length !== 1;
      },
      deletePlatform() {
        commonMixin.methods.showConfirmDialog(this, '删除平台【' + this.multipleSelection[0].name + '】是否继续?').then(() => {
            Axios.delete("http://localhost:8080/platforms/" + deleteRow.id).then((response) => {
              commonMixin.methods.successMessage(this);
              this.getPlatforms();
            }).catch((error) => {
              commonMixin.methods.showErrorDialog(this, error);
            });
          }
        ).catch(() => {
          commonMixin.methods.cancelMessage(this);
        });
      }
    }
  }
</script>

<style>
  @import "../assets/css/default.css";

  .el-button-group {
    margin: 0 0 0 50px;
  }
</style>
