<template>


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
</template>
<script>
  import Axios from 'axios';

  var appData = require('../mock/RoomOwnerAccountInfo.json');
  export default {
    data() {
      return {
        dialogFormVisible: false,
        showData: [],
        formLabelWidth: '120px',
        form: {
          bankName: '',
          subBankName: '',
          account: '',
          weChat: '',
          alipay: '',
          name: '',
          telPhone: '',
          comment: ''
        }
      }
    },

    mounted() {
      this.showData = this.getRows();
    },
    methods: {
      getRows() {
        Axios.get('/rent-data').then((response) => {
          this.form = appData;
        }).catch((error) => {
          console.log(error)
        });
      },
      close() {
        this.dialogFormVisible = false;
      },
      open() {
        this.dialogFormVisible = true;
      },
      success() {
        this.dialogFormVisible = false;
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
        return this.dialogFormVisible;
      }
    }
  }
</script>

<style>
  /*@import "../assets/css/default.css";*/
  /*@import "../assets/css/rent.css";*/
</style>
