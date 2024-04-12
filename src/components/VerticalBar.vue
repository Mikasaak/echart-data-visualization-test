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

function renderChart() {
  mChart = echarts.init(target.value)
  const options = {
    xAxis: {
      type:'category',
      data: props.data?.servers.map(item => item.name)||[{}],
      axisLabel: {
        color: '#9eb1c8',
      },
    },
    yAxis: {
      show: false,
      type: 'value',
      max: function (value) {
        return value.max + value.max * 0.1
      }
    },
    grid: {
      left: '-26',
      right: '0',
      bottom: '26',
      top: '16',
      containLabel: true
    },
    series: [
      {
        type: 'bar',
        data: props.data?.servers.map(item => {
          return {
            name: item.name,
            value: item.value,
          }
        })||[{}],
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        },
        itemStyle: {
          color:'#5d98ce',
          barBorderRadius: 5,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 5,
        },
        barWidth: 12,
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          formatter:'{c}%'
        }
      }
    ]
  }
  mChart.setOption(options)
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
    <div>【服务资源占用比】</div>
    <div ref="target" class="h-full w-full"></div>
  </div>
</template>

<style scoped>

</style>
