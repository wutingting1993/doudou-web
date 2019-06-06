<template>
  <div>
    <div style="text-align: center">
      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
        <el-button type="warning" icon="el-icon-edit" @click="dialogFormVisible = true">编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="open">删除</el-button>
      </el-button-group>
    </div>
    <div class="container">
      <el-table
        :data="showData"
        ref="platformTable"
        border
        @selection-change="handleSelectionChange">
        <el-table-column type="selection"/>
        <el-table-column v-for="item in columns"
                         :prop="item.field"
                         :label="item.title">
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="新增平台" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="平台名称" :label-width="formLabelWidth">
          <el-input v-model="form.platformName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableHeight: 0,
        dialogFormVisible: false,
        showData: [
          {"id": "1", "type": "线上", "platformName": "携程", 'comment': "this is desc"},
          {"id": "2", "type": "线上", "platformName": "飞猪", 'comment': "this is desc"},
          {"id": "3", "type": "线下", "platformName": "三更宿", 'comment': "this is desc"}
        ],
        columns: [
          {field: 'id', title: '编号'},
          {field: 'platformName', title: '平台名称'},
          {field: 'type', title: '平台类型'},
          {field: 'comment', title: '备注'}
        ],
        multipleSelection: [],
        formLabelWidth: '120px',
        form: {
          platformName: '',
          comment: '',
          type: ''
        }
      }
    },

    mounted() {
    },
    methods: {
      success() {
        this.dialogFormVisible = false
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
        return this.dialogFormVisible;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }, open() {
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
      }
    }
  }
</script>

<style>
  .dashboard-table {
    width: 100%;
    height: 100%;
  }

  div > .container {
    margin: 50px 50px 50px 50px;
    justify-content: center;
    text-align: left;
  }

  .el-button-group {
    margin: 0 0 0 50px;
  }
</style>
