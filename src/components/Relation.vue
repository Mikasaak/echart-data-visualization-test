<script setup>
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts';


const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
let mChart = null
const target = ref(null)
const renderChart = () => {
  mChart = echarts.init(target.value)
  const option = {
    xAxis: {
      show: false,
      type: 'value',
    },
    yAxis: {
      show: false,
      type: 'value',
    },
    series: [
      {
        type: 'graph',
        layout: 'none',
        coordinateSystem: 'cartesian2d',
        z: 3,
        edgeLabel: {
          normal: {
            color: '#fff',
            show: true,
            formatter: function (params) {
              return params.data.speed
            },
            textStyle: {
              fontSize: 14
            }
          }

        },
        label: {
          normal: {
            show: true,
            position: 'bottom',
            color: '#5E5E5E',
          }
        },
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: 8,
        data: props.data?.relations.map(item => {
          if (item.id) {
            return {
              name: item.name,
              category: 0,
              symbolSize: 20,
              active: true,
              speed: `${item.speed}kb/s`,
              value: item.value,
            }
          } else {
            return {
              name: item.name,
              value: item.value,
              symbolSize: 100,
              itemStyle: {
                color: {
                  type: 'linear',
                  colorStops: [
                    {
                      offset: 0,
                      color: '#157eff' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#35c2ff' // 100% 处的颜色
                    }
                  ],
                },

              },
              label: {
                normal: {
                  show: true,
                  fontSize: 14,
                }
              }

            }
          }
        })||[{}],
        links: props.data?.relations.map((item, index) => {
          return {
            source: item.source,
            target: item.target,
            speed: `${item.speed}kb/s`,
            lineStyle: {
              normal: {
                color: '#12b5d0',
                width: 1,
                curveness: 0.2,
              }
            },
            label: {
              show: true,
              position: 'middle',
              offset: [10, 0],
            }
          }
        })||[{}],
      },
      {
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        z: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          symbol: 'arrow',
          symbolSize: 12,
          color: 'rgba(55,155,255,0.6)',
        },
        lineStyle: {
          normal: {
            curveness: 0.2,
          }
        },
        data: [
          [{coord: [0, 300]}, {coord: [50, 200]}],
          [{coord: [0, 100]}, {coord: [50, 200]}],
          [{coord: [50, 200]}, {coord: [100, 100]}],
          [{coord: [50, 200]}, {coord: [100, 300]}],
        ]
      }
    ]
  }
  mChart.setOption(option)

}

onMounted(() => {

      renderChart()
    }
)


watch(() => props.data, () => {
  renderChart()
})

</script>

<template>
  <div>
    <div class="title">【数据传递信息】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<style scoped>

</style>
