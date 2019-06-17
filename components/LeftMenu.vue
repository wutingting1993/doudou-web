<template>
  <el-aside
    width="auto"
    @mouseenter.native="collapseOpen"
    @mouseleave.native="collapseClose">
    <el-menu
      :default-active="activeUrl"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router
      class="el-menu-vertical-demo">
      <template v-for="menu in menus">
        <el-menu-item v-if="menu.submenus==='undefined' || menu.submenus.length === 0" :index="menu.url">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.title}}</span>
        </el-menu-item>
        <el-submenu v-else :index="menu.url">
          <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{menu.title}}</span>
          </template>
          <div v-for="submenu in menu.submenus">
            <el-menu-item :index="submenu.url">
              <i :class="submenu.icon"></i>
              <span slot="title">{{submenu.title}}</span>
            </el-menu-item>
          </div>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    data() {
      return {
        collapseBtnClick: false,
        isCollapse: false,
        menus: [],
        activeUrl: null
      };
    },
    mounted() {
      this.menus = require('../mock/LeftMenu.json');
      this.activeUrl = this.menus[0].url;
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
