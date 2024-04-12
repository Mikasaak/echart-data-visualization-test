<script setup>
import {inject, onMounted, ref, watch} from "vue";
import * as echarts from 'echarts';


const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const resizeEcharts = inject('resizeEcharts')

const target = ref(null)
const createRenderChart = () => {
  let mChart =  null
  return function () {
    mChart = echarts.init(target.value)
    const option = {
      // x轴
      xAxis: {
        show: false,
        type: 'value',
        max: function (value) {
          return value.max + value.max * 0.1
        }
      },
      yAxis: {
        type: 'category',
        data: props.data?.regions.map(item => item.name)||[{}],
        inverse: true,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#9eb1c8',
        },
      },
      //绘制的位置
      grid: {
        left: '0',
        right: '0',
        bottom: '0',
        top: '0',
        containLabel: true
      },
      series: [
        {
          type: 'bar',
          data: props.data?.regions.map(item => {
            return {
              name: item.name,
              value: item.value,
            }
          })||[{}],
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          },
          itemStyle: {
            color: '#5d98ce',
            barBorderRadius: 5,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 5,
          },
          barWidth: 12,
          label: {
            show: true,
            position: 'right',
            color: '#fff'
          }
        }
      ]
    }
    mChart.setOption(option, true)
  }
}
const renderChart = createRenderChart()

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
    <div class="title">【大区数据信息】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<style scoped>

</style>
