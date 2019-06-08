<template>
  <div class="charts">
    <div id="daily-pie" class="chart"></div>
    <div id="weekly-pie" class="chart"></div>
    <div id="monthly-pie" class="chart"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    data() {
      return {
        dailyPieChart: null,
        weeklyPieChart: null,
        monthlyPieChart: null,
        dailyPieData: [
          {value: 1000, name: '线上'},
          {value: 2000, name: '线下'}
        ],
        weeklyPieData: [
          {value: 12000, name: '线上'},
          {value: 200002, name: '线下'}
        ],
        monthlyPieData: [
          {value: 1200000, name: '线上'},
          {value: 30033002, name: '线下'}
        ]
      }
    },
    methods: {
      initCharts(title, pieChart) {
        var chart = echarts.init(document.getElementById(pieChart + '-pie'))
        let option = {
          title: {
            text: title,
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            data: ['线上', '线下'],
            formatter: function (name) {
              let oa = option.series[0].data;
              let total = 0;
              oa.forEach((item, index) => {
                total += item.value;
              });
              for (let i = 0; i < oa.length; i++) {
                if (name === oa[i].name) {
                  return name + '  ' + oa[i].value;
                }
              }
            },
          },
          series: [
            {
              name: '订单来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: pieChart === 'daily' ? this.dailyPieData : pieChart === 'weekly' ? this.weeklyPieData : this.monthlyPieData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
          color: [
            '#00acee',
            '#52cdd5'
          ]
        };
        chart.setOption(option);
        chart.showLoading();
        if (pieChart === 'daily') {
          this.dailyPieChart = chart;
        } else if (pieChart === 'weekly') {
          this.weeklyPieChart = chart;
        } else {
          this.monthlyPieData = chart;
        }
      },
      handleSure() {
        this.dailyPieData = [
          {value: 3000, name: '线上'},
          {value: 2000, name: '线下'}
        ];
        this.weeklyPieData = [
          {value: 13000, name: '线上'},
          {value: 22000, name: '线下'}
        ];
        this.monthlyPieData = [
          {value: 433000, name: '线上'},
          {value: 442000, name: '线下'}
        ];
      }
    },
    mounted() {
      this.initCharts('月销售额', 'monthly');
      this.initCharts('周销售额', 'weekly');
      this.initCharts('日销售额', 'daily');
      this.dailyPieChart.hideLoading();
      this.weeklyPieChart.hideLoading();
      this.monthlyPieData.hideLoading();
    }
  }
</script>

<style scoped>
  .charts {
    align-items: center;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
  }

  .charts {
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
  }

  .charts .chart {
    height: 500px;
    width: 33%;
    min-width: 300px;
    padding-top: 20px;
    float: right;
  }
</style>
