<template>
  <el-dialog :title="title" :visible.sync="accountDialogTableVisible">
    <el-form :model="form">
      <el-form-item label="银行名称" :label-width="formLabelWidth">
        <el-select v-model="form.bankName" placeholder="请选择银行">
          <el-option label="中国银行" value="中国银行"></el-option>
          <el-option label="招商银行" value="招商银行"></el-option>
          <el-option label="农商银行" value="农商银行"></el-option>
          <el-option label="建设银行" value="建设银行"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支行名称" :label-width="formLabelWidth">
        <el-input v-model="form.subBankName"></el-input>
      </el-form-item>
      <el-form-item label="银行账户" :label-width="formLabelWidth">
        <el-input v-model="form.account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="微信" :label-width="formLabelWidth">
        <el-input v-model="form.weChat" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="支付宝" :label-width="formLabelWidth">
        <el-input v-model="form.alipay" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input v-model="form.telPhone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="form.comment" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editable = true" type="warning" class="el-icon-edit-outline">编 辑</el-button>
      <el-button @click="editable = false" type="danger" class="el-icon-check">保存</el-button>
      <el-button type="primary" @click="accountDialogTableVisible = false">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import Axios from 'axios';

  var appData = require('../mock/RoomOwnerAccountInfo.json');
  export default {
    data() {
      return {
        title: '房源配套',
        accountDialogTableVisible: false,
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
      this.title = this.roomNo + " " + this.title;
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
  /*@import "../assets/css/default.css";*/
  /*@import "../assets/css/rent.css";*/
</style>
