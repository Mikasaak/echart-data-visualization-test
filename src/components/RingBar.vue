<script setup>
import {onMounted, ref, watch} from "vue";
import * as echarts from 'echarts';
import {data} from "autoprefixer";


const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})


let mChart = null
const target = ref(null)

function getSeries() {
  let series = []
  props.data?.abnormals.forEach((item, index) => {
    series.push({
      name: item.name,
      type: 'pie',
      clockWise: false,
      hoverAnimation: false,
      radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
      center: ['55%', '55%'],
      label: {
        show: false,
      },
      data: [
        {
          value: item.value,
          name: item.name
        },
        {
          name:'test',
          value: 1500-item.value,
          itemStyle: {
            color: 'rgb(3,31,62)',
            borderWidth: 0,
          },
          tooltip: {
            show: false
          },
          // hoverAnimation: false
        },
        {
          value:500,
          itemStyle: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0,
          },
          tooltip: {
            show: false
          }

        }
      ]
    })
  })


  return series
}


const renderChart = () => {
  mChart = echarts.init(target.value)
  const options = {
    //图例
    legend: {
      show: true,
      icon: 'circle',
      top: '14%',
      left: '60%',
      width: -5,
      data: props.data?.abnormals.map(item => item.name)||[{}],
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 6,
      textStyle: {
        rick: {
          title: {
            color: 'rgba(255,255,255,0.8)',
            fontSize: 12,
            lineHeight: 5,
          }
        },
        color: '#9eb1c8',
        fontSize: 12,
      }
    },
    //提示框
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: '{b}<br/>{b}: {c}({d}%)',
      axisPointer: {
        type: 'shadow'
      }
    },
    //y轴
    yAxis: {
      type: 'category',
      inverse: true,
      show: false,
    },

    //x轴
    xAxis: {
      show: false,
    },
    series: getSeries()


  }

  mChart.setOption(options)
}

onMounted(() => {
      renderChart()
    }
)


watch(() => props.data, () => {
  // console.log(props.data)
  renderChart()
})

</script>

<template>
  <div>
    <div>【大区异常处理】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<style scoped>

</style>
