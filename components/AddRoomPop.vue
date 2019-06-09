<template>
  <el-dialog title="新增房源" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules">
      <el-form-item label="房号" :label-width="formLabelWidth" prop="roomNo">
        <el-input v-model="form.roomNo" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="房型" :label-width="formLabelWidth" prop="type">
        <el-select v-model="form.type" placeholder="请选择房型">
          <el-option label="单间" value="1"></el-option>
          <el-option label="一室一厅" value="2"></el-option>
          <el-option label="一室两厅" value="3"></el-option>
          <el-option label="两室一厅" value="4"></el-option>
          <el-option label="两室两厅" value="5"></el-option>
          <el-option label="三室一厅" value="6"></el-option>
          <el-option label="三室两厅" value="7"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房东" :label-width="formLabelWidth" prop="owner">
        <el-input v-model="form.owner" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="房东电话" :label-width="formLabelWidth" prop="ownerPhone">
        <el-input v-model="form.ownerPhone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系人" :label-width="formLabelWidth">
        <el-input v-model="form.contact" autocomplete="off" placeholder="默认房东"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话" :label-width="formLabelWidth">
        <el-input v-model="form.contactPhone" autocomplete="off" placeholder="默认房东电话"></el-input>
      </el-form-item>
      <el-form-item label="租期" :label-width="formLabelWidth" prop="rentTime">
        <el-date-picker v-model="form.rentTime"
                        type="daterange"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        clearable
                        :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="租金/月" :label-width="formLabelWidth" prop="price">
        <el-input v-model="form.price" autocomplete="off" type="number">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="押金" :label-width="formLabelWidth" type="number" prop="deposit">
        <el-input v-model="form.deposit" autocomplete="off">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="支付周期" :label-width="formLabelWidth" prop="paymentCycle">
        <el-select v-model="form.paymentCycle" placeholder="请选择支付周期">
          <el-option label="按月" value="1"></el-option>
          <el-option label="季度" value="2"></el-option>
          <el-option label="半年" value="3"></el-option>
          <el-option label="一年" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支付方式" :label-width="formLabelWidth" prop="payWay">
        <el-select v-model="form.payWay" placeholder="请选择支付方式">
          <el-option label="银行" value="1"></el-option>
          <el-option label="支付宝" value="2"></el-option>
          <el-option label="微信" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.payWay === '3'" label="微信" :label-width="formLabelWidth" prop="weChat">
        <el-input v-model="form.weChat" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item v-else-if="form.payWay === '2'" label="支付宝" :label-width="formLabelWidth" prop="alipay">
        <el-input v-model="form.alipay" autocomplete="off"></el-input>
      </el-form-item>
      <div v-else-if="form.payWay === '3'">
        <el-form-item label="银行名称" :label-width="formLabelWidth" prop="bankName">
          <el-select v-model="form.bankName" placeholder="请选择支付银行">
            <el-option label="招商银行" value="1"></el-option>
            <el-option label="农商银行" value="2"></el-option>
            <el-option label="建设银行" value="3"></el-option>
            <el-option label="农业银行" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支行名称" :label-width="formLabelWidth">
          <el-input v-model="form.subBankName"></el-input>
        </el-form-item>
        <el-form-item label="银行账户" :label-width="formLabelWidth" prop="account">
          <el-input v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.telPhone" autocomplete="off"></el-input>
        </el-form-item>
      </div>
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
  import {pickerOptions} from '../assets/js/default';

  export default {
    data() {
      return {
        pickerOptions: {},
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form: {
          roomNo: '',
          type: '',
          owner: '',
          ownerPhone: '',
          contact: '',
          contactPhone: '',
          rentTime: '',
          price: '',
          deposit: '',
          paymentCycle: '',
          payWay: '',
          bankName: '',
          subBankName: '',
          account: '',
          weChat: '',
          alipay: '',
          name: '',
          telPhone: '',
          comment: '',
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
      this.pickerOptions = pickerOptions();
    },
    methods: {
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
