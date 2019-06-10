<template>
  <div style="width: 100%; height: 100%; position: absolute; ">
    <el-container>
      <el-header>

      </el-header>
      <el-container>
        <left/>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 0 0 50px 50px">
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

  import Left from '../components/Left.vue'

  export default {
    components: {
      Left
    }, methods: {
      collapseStatus() {
        this.isCollapse = !this.isCollapse;
      }
    }
  }
</script>

<style>
  @import "../assets/css/default.css";
</style>
