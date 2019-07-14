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
        :data="staffList"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection"/>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item v-for="item in staffFields"
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
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="modelTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="form.sexType" placeholder="请选择性别">
            <el-option label="男" value="Male"></el-option>
            <el-option label="女" value="Female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.telphone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="微信" :label-width="formLabelWidth">
          <el-input v-model="form.wechat" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证" :label-width="formLabelWidth">
          <el-input v-model="form.idCard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="form.position" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="基本工资/月" :label-width="formLabelWidth">
          <el-input v-model="form.baseSalaryPerMonth" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="休假/天" :label-width="formLabelWidth">
          <el-input v-model="form.vacationPerSalary" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="缺席/天" :label-width="formLabelWidth">
          <el-input v-model="form.absenteeismPerSalary" autocomplete="off"></el-input>
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
  import commonMixin from '../../mixins/common';

  var staffFields = require('../../mock/staffFields.json');

  export default {
    mixins: [commonMixin],
    data() {
      return {
        tableHeight: 0,
        dialogFormVisible: false,
        staffList: [],
        staffFields: [],
        columns: [
          {field: 'name', title: '姓名'},
          {field: 'position', title: '职位'},
          {field: 'telphone', title: '电话'},
          {field: 'wechat', title: '微信'}
        ],
        multipleSelection: [],
        formLabelWidth: '120px',
        form: {
          id: '',
          name: '',
          sexType: '',
          position: '',
          telphone: '',
          wechat: '',
          idCard: '',
          baseSalaryPerMonth: '',
          vacationPerSalary: '',
          absenteeismPerSalary: '',
          description: ''
        },
        deleteFlag: true,
        modelTitle: '新增员工'
      }
    },

    mounted() {
      this.getPlatforms();
      this.staffFields = staffFields;
    },
    methods: {
      getPlatforms() {
        Axios.get("http://localhost:8080/staffs").then((response) => {
          this.staffList = response.data.content;
        }).catch((error) => {
          this.staffList = [];
          console.log(error)
        });
      },
      showEditDialog() {
        this.dialogFormVisible = true;
        this.modelTitle = '编辑员工';
        Axios.get("http://localhost:8080/staffs/" + this.multipleSelection[0].id).then((response) => {
          this.form = response.data.content;
        }).catch((error) => {
          commonMixin.methods.showErrorDialog(this, error);
        });
      },
      showAddDialog() {
        this.dialogFormVisible = true;
        this.modelTitle = '新增员工';
        this.form = {};
      },
      addPlatform() {
        Axios.post("http://localhost:8080/staffs", this.form).then((response) => {
          this.dialogFormVisible = false;
          commonMixin.methods.successMessage(this);
          this.getPlatforms();
        }).catch((error) => {
          commonMixin.methods.showErrorDialog(this, error);
        });
      },
      updatePlatform: function () {
        Axios.patch("http://localhost:8080/staffs/" + this.multipleSelection[0].id, this.form).then((response) => {
          this.dialogFormVisible = false;
          commonMixin.methods.successMessage(this);
          this.getPlatforms();
        }).catch((error) => {
          commonMixin.methods.showErrorDialog(this, error);
        });
      },
      savePlatform() {
        if (this.modelTitle === '新增员工') {
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
        commonMixin.methods.showConfirmDialog(this, '删除员工【' + this.multipleSelection[0].name + '】是否继续?').then(() => {
            Axios.delete("http://localhost:8080/staffs/" + this.multipleSelection[0].id).then((response) => {
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
  @import "../../assets/css/default.css";

  .el-button-group {
    margin: 0 0 0 50px;
  }
</style>
