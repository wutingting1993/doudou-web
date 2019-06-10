<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules">
      <el-form-item label="属主" :label-width="formLabelWidth" prop="roomNo">
        <el-select v-model="form.owner" placeholder="请选择属主" size="small">
          <el-option label="莱恩" value="1"></el-option>
          <el-option label="房东" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资产名称" :label-width="formLabelWidth" prop="roomNo">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="单价" :label-width="formLabelWidth" prop="roomNo">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="数量" :label-width="formLabelWidth" prop="roomNo">
        <el-input v-model="form.num"></el-input>
      </el-form-item>
      <el-form-item label="总价" :label-width="formLabelWidth" prop="roomNo">
        <el-input v-model="form.totalMoney"></el-input>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth" prop="roomNo">
        <el-select v-model="form.status" placeholder="请选择状态" size="small">
          <el-option label="已安装" value="1"></el-option>
          <el-option label="未安装" value="2"></el-option>
          <el-option label="已废弃" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签" :label-width="formLabelWidth" prop="roomNo">
        <el-autocomplete v-model="form.labels" size="small"
                         class="inline-input"
                         placeholder="请输入内容"
                         @select="handleSelect">
        </el-autocomplete>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="form.comment" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-button-group style="margin-bottom: 50px;">
      <el-button size="small">新 增</el-button>
      <el-button size="small" type="primary" @click="success">保 存</el-button>
    </el-button-group>

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
      style="padding-bottom: 150px;"
      background
      layout="prev, pager, next"
      :hide-on-single-page="true"
      :total="totalCount"
      :current-page="currentPage"
      :page-size="pageSize"
      align="right">
    </el-pagination>
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
        title: '套房配置',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        showData: [],
        columns: [],
        totalCount: 0,
        pageSize: 5,
        currentPage: 1,
        form: {
          roomNo: '',
          name: '',
          owner: '',
          price: null,
          num: null,
          totalMoney: null,
          status: '',
          labels: '',
          comment: ''
        },
        rules: {
          roomNo: [
            {required: true, message: '请输入房号', trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择房型', trigger: 'change'}
          ],
          owner: [
            {required: true, message: '请输入房东姓名', trigger: 'blur'}
          ],
          ownerPhone: [
            {type: 'tel', required: true, message: '请输入房东电话', trigger: 'blur'}
          ],
          rentTime: [
            {type: 'date', required: true, message: '请选择租期', trigger: 'blur'}
          ],
          price: [
            {type: 'number', required: true, message: '请输入租金', trigger: 'blur'}
          ],
          deposit: [
            {type: 'number', required: true, message: '请输入押金', trigger: 'blur'}
          ],
          payWay: [
            {required: true, message: '请选择支付方式', trigger: 'change'}
          ],
          weChat: [
            {required: true, message: '请输入微信号', trigger: 'blur'}
          ],
          alipay: [
            {required: true, message: '请输入支付宝账号', trigger: 'blur'}
          ],
          bankName: [
            {required: true, message: '请输入银行名称', trigger: 'blur'}
          ],
          account: [
            {required: true, message: '请输入银行账号', trigger: 'blur'}
          ]
        }
      }
    },

    mounted() {
      this.getHeaders();
      this.getRows();
      this.totalCount = this.showData.length;
      this.title = this.roomNo + this.title;
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
