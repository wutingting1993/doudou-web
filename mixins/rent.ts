export default {
  methods: {
    spanRow(row, column, rowIndex, columnIndex, notSpanRow) {
      if (notSpanRow.indexOf(column.property) === -1) {
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
    payStatus(row, column) {
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
    setUpStatus({row, column, rowIndex, columnIndex}) {
      console.log(564654);
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
    openDialog(obj) {
      obj.$confirm('删除平台, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        obj.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        obj.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    formatterLabels(row, col) {
      if (col.property !== 'labels') {
        return row[col.property];
      }
      var html = "";
      row.labels.forEach(label => {
        html += "<span class=\"el-tag el-tag--success el-tag--mini el-tag--light\">" + label + " </span>";
      });

      return html;
    }
  }
}
