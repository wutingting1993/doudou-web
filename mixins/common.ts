import {DatePicker} from "element-ui";

export default {
  methods: {
    handleSelect(item: any) {
    },
    pickerOptions() {
      return {
        shortcuts: [{
          text: '最近一周',
          onClick(picker: DatePicker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker: DatePicker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker: DatePicker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    },
    showErrorDialog(_this: any, error: any) {
      _this.$alert(error.response.data.message, '提示', {
        showCancelButton: false,
        confirmButtonText: '确定',
        type: 'error',
        center: true
      })
    },
    showConfirmDialog(_this: any, message: any) {
      return _this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
    },
    cancelMessage(_this: any) {
      return _this.$message({
        type: 'info',
        message: '操作已取消'
      })
    },
    successMessage(_this: any) {
      return _this.$message({
        type: 'success',
        message: '操作成功'
      })
    }
  }
}
