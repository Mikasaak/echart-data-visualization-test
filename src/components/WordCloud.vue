<script setup>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts';
import '@/utils/echarts-wordcloud.min.js'



const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// 获取 dom 实例
const target = ref(null)

// echarts 实例变量
let mChart = null
// 在 mounted 生命周期之后，实例化 echarts
onMounted(() => {
  // 渲染 echarts
  renderChart()
})

/**
 * 生成随机色值
 */
const randomRGB = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return `rgb(${r}, ${g}, ${b})`
}

// 渲染图表
const renderChart = () => {
  mChart = echarts.init(target.value)
  // console.log(mChart)
  const options = {
    // series: [
    //   {
    //     type: 'wordCloud',
    //     shape: 'circle',
    //     left: 'center',
    //     top: 'center',
    //     width: '70%',
    //     height: '80%',
    //     right: null,
    //     bottom: null,
    //     sizeRange: [12, 60],
    //     rotationRange: [-90, 90],
    //     rotationStep: 45,
    //     gridSize: 8,
    //     drawOutOfBound: false,
    //     textStyle: {
    //       normal: {
    //         fontFamily: 'sans-serif',
    //         fontWeight: 'bold',
    //         color: function () {
    //           return randomRGB()
    //         }
    //       },
    //       emphasis: {
    //         shadowBlur: 10,
    //         shadowColor: '#333'
    //       }
    //     },
    //     data: props.data?.datas||[{}]
    //   }
    // ]

  }
  // console.log('options', options)

  mChart.setOption(options)
}

// 监听数据的变化，重新渲染图表
watch(
    () => props.data,
    () => {
      renderChart()
    }
)

</script>

<template>
  <div>
    <div>【服务资源占用比】</div>
    <div ref="target" class="h-full w-full"></div>
  </div>
</template>

<style scoped>

</style>
