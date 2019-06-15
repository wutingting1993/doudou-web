export default {
  methods: {
    rowSpan({row, column, rowIndex, columnIndex}: any) {
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
    }, colSpan({row, column, rowIndex, columnIndex}: any, showData: any) {
      var spanCols = showData[rowIndex][column.property].colspan;
      if (spanCols > 1) {
        return [1, spanCols];
      }
    }
  }
}
