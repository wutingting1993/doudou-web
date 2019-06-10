<template>
  <div>
    <div class="filter-charts" h>
      <el-date-picker style="margin: 20px" v-model="date" value-format="yyyy-MM-dd" size="small" type="date" placeholder="选择日期"></el-date-picker>
      <el-radio-group v-model="radio" v-for="item in checkboxItems" v-bind:key="item">
        <el-radio :label="item"></el-radio>
      </el-radio-group>
      <el-button style="margin-left: 50px; margin-bottom: 20px" type="primary" @click="handleSure">确定</el-button>
      <el-switch v-model="typeBoolean" active-color="#00B5FF" inactive-color="#7ED321" active-text="bar" inactive-text="line"></el-switch>
    </div>
    <div class="monthChart">
      <dashboard-pie/>
      <div id="chartOne" class="chart"></div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import DashboardPie from '../components/DashboardPie'

  export default {
    components: {
      DashboardPie
    },
    data() {
      return {
        checkboxItems: ['线上/线下', '莱恩/三更宿/西西里', '携程/飞猪/三更宿/西西里'],
        radio: '莱恩/三更宿/西西里',
        myChartOne: null,
        dataAll: {
          online: [10, 15, 28, 12, 15, 10, 15, 28, 12, 15],
          offline: [10, 15, 28, 12, 15, 10, 15, 28, 12, 15]
        },
        date: '',
        typeBoolean: true
      }
    },
    computed: {
      type: function () {
        return this.typeBoolean ? 'bar' : 'line'
      }
    },
    methods: {
      initCharts() {
        this.myChartOne = echarts.init(document.getElementById('chartOne'))
        this.myChartOne.setOption({
          title: {text: this.date}
          ,
          legend: {
            // orient: 'vertical',
            left: 'right',
            data: ['线上', '线下']
          },
          grid: {
            top: 120
          },
          yAxis: [
            {
              name: '元',
              type: 'value',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                color: '#666',
                fontSize: 12
              }
            },
            {
              name: '元',
              type: 'value',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                color: '#666',
                fontSize: 12
              }
            }
          ],
          xAxis: {
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#666',
              fontSize: 12,
              margin: 12
            },
            data: ['2019-06-01', '2019-06-02', '2019-06-03', '2019-06-04', '2019-06-05', '2019-06-06', '2019-06-07', '2019-06-08', '2019-06-09', '2019-06-10']
          },
          series: [
            {
              name: '线上',
              yAxisIndex: 0,
              data: [],
              type: 'bar',
              color: '#00B5FF'
            },
            {
              name: '线下',
              yAxisIndex: 1,
              data: [],
              type: 'bar',
              color: '#7ED321'
            }
          ]
        });
        this.myChartOne.showLoading();
      },
      handleSure() {
        if (this.date === '') return
        var newSeries = []
        if (this.typeBoolean) {
          newSeries = [
            {
              name: 'one',
              type: this.type,
              color: '#00B5FF'
            },
            {
              name: 'two',
              type: this.type,
              color: '#7ED321'
            }
          ]
        } else {
          newSeries = [
            {
              name: 'one',
              type: this.type,
              color: '#00B5FF',
              symbolSize: 6,
              lineStyle: {
                width: 4
              }
            },
            {
              name: 'two',
              type: this.type,
              color: '#7ED321',
              symbolSize: 6,
              lineStyle: {
                width: 4
              }
            }
          ]
        }
        this.myChartOne.setOption({
          title: {
            text: this.date
          },
          series: [{...newSeries[0], data: this.dataAll.offline}, {...newSeries[1], data: this.dataAll.online}]
        });
      }
    },
    mounted() {
      this.initCharts()
      var $this = this
      setTimeout(function () {
        $this.myChartOne.setOption({
          title: {
            text: '近一月售额',
            x: 'center'
          },
          series: [
            {
              name: '线上',
              data: $this.dataAll.online
            },
            {
              name: '线下',
              data: $this.dataAll.offline
            }
          ]
        });
        $this.myChartOne.hideLoading();
      }, 1000)
    }
  }
</script>

<style scoped>
  .filter-charts {
    border: 1px solid rgba(155, 155, 155, 0.2)
  }

  .filter-charts .el-radio-group {
    display: inline-block;
    padding-left: 10px;
  }

  .monthChart {
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
  }

  .monthChart .chart {
    height: 500px;
    width: 100%;
    position: relative;
    min-width: 300px;
    padding-top: 20px;
  }
</style>
