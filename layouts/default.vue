<template>
  <div style="width: 100%; height: 100%; position: absolute; ">
    <el-container>
      <el-header>

      </el-header>
      <el-container>
        <left/>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">套房信息</el-breadcrumb-item>
            <el-breadcrumb-item>采购管理</el-breadcrumb-item>
            <el-breadcrumb-item>待采购</el-breadcrumb-item>
          </el-breadcrumb>
          <nuxt/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>

  import Left from '~/components/Left.vue'

  export default {
    components: {
      Left
    }, methods: {
      collapseStatus() {
        this.collapseBtnClick = this.isCollapse;
        this.isCollapse = !this.isCollapse;
      }
    }
  }
</script>

<style>

  .el-header {
    background-color: #F56C6C;
    color: #333;
    line-height: 80px;
  }

  .el-main {
    height: 100%;
    width: auto;
    position: relative;
  }

  .el-container {
    height: 100%;
    width: 100%;
    position: relative;
    border: 1px solid #eee;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }
</style>
