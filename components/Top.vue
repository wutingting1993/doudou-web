<template>

  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">房态信息</el-menu-item>
    <el-menu-item index="2">订单信息</el-menu-item>
    <el-menu-item index="3">平台管理</el-menu-item>
    <el-submenu index="4">
      <template slot="title">套房信息</template>
      <el-menu-item index="4-1">租金管理</el-menu-item>
      <el-menu-item index="4-2">资产管理</el-menu-item>
      <el-menu-item index="4-3">采购管理</el-menu-item>
      <el-menu-item index="4-4">安装管理</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
