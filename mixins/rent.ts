export default {
  methods: {
    payStatus({row, column, rowIndex, columnIndex}: any) {
      if (column.property === 'payStatus' && row[column.property]) {
        var status = row[column.property];
        if (status === '已支付') {
          return 'green';
        } else if (status === '未支付') {
          return 'red';
        }
        return 'white';
      }
    },
    setUpStatus({row, column, rowIndex, columnIndex}: any) {
      if (column.property === 'status' && row[column.property]) {
        var status = row[column.property];
        if (status === '已安装') {
          return 'green';
        } else if (status === '未安装') {
          return 'red';
        } else if (status === '安装中') {
          return 'orangered';
        }
        return 'white';
      }
    },
    openConfirmDialog() {
      this.$confirm('删除平台, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    formatterLabels(row: any, col: any) {
      if (col.property !== 'labels') {
        return row[col.property];
      }
      var html = "";
      row.labels.forEach((label: any) => {
        html += "<span class=\"el-tag el-tag--success el-tag--mini el-tag--light\">" + label + " </span>";
      });

      return html;
    }
  }
}
