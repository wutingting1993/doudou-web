<template>
  <el-aside
    width="auto"
    @mouseenter.native="collapseOpen"
    @mouseleave.native="collapseClose">
    <el-menu
      default-active="1"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      class="el-menu-vertical-demo">
      <el-menu-item index="1">
        <a href="/"><i class="el-icon-menu"></i>
          <span slot="title">Dashboard</span></a>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">订单信息</span>
      </el-menu-item>
      <el-menu-item index="3">
        <a href="/platform">
          <i class="el-icon-setting"></i>
          <span slot="title">平台管理</span>
        </a>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>套房信息</span>
        </template>
        <el-submenu index="4-1">
          <template slot="title">租金管理</template>
          <el-menu-item index="4-1-1">选项1</el-menu-item>
          <el-menu-item index="4-1-2">选项2</el-menu-item>
        </el-submenu>
        <el-menu-item index="4-3">资产管理</el-menu-item>
        <el-submenu index="4-4">
          <template slot="title">采购管理</template>
          <el-menu-item index="4-4-1">选项1</el-menu-item>
        </el-submenu>
        <el-menu-item index="4-5">安装管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    data() {
      return {
        collapseBtnClick: false,
        isCollapse: true,
        aaa: 111
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      collapseStatus() {
        this.collapseBtnClick = this.isCollapse;
        this.isCollapse = !this.isCollapse;
      },
      collapseOpen() {
        if (this.collapseBtnClick) return;
        this.isCollapse = false;
      },
      collapseClose() {
        if (this.collapseBtnClick) return;
        this.isCollapse = true;
      }
    }
  }
</script>

<style>
  .el-aside {
    color: #333;
    background-color: rgb(238, 241, 246);
    height: 100%;
    width: auto;
    position: relative;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 100%;
    width: 250px;
    position: initial;
  }

  .el-menu-item a, .el-menu-item a:hover {
    color: inherit;
    text-decoration: none;
  }
</style>
