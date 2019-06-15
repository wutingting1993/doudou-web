<template>

  <el-header>

    <el-row class="demo-autocomplete">
      <span class="demonstration">入住人</span>
      <el-autocomplete
        class="inline-input"
        v-model="state1"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        @select="handleSelect"
      ></el-autocomplete>
      <span class="demonstration">入住时间</span>
      <el-date-picker
        v-model="value2"
        type="daterange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        clearable
        :default-time="['00:00:00', '23:59:59']">
      </el-date-picker>
    </el-row>
  </el-header>
</template>
