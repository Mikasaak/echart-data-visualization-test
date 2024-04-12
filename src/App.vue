<script setup>


import HorizontalBar from "./components/HorizontalBar.vue";
import RadarBar from "./components/RadarBar.vue";
import Relation from "./components/Relation.vue";
import VerticalBar from "./components/VerticalBar.vue";
import RingBar from "./components/RingBar.vue";
import WordCloud from "./components/WordCloud.vue";
import TotalData from "./components/TotalData.vue";
import MapChart from "./components/MapChart.vue";
import {provide, ref} from "vue";
import {getVisualization} from "@/apis/visualization.js";


const data = ref()
const loadData= async ()=>{
  data.value = await getVisualization()//axios请求获取数据
  // console.log(data.value)
}
loadData()

setInterval(()=>{
  loadData()
},3000)

const resizeEcharts = (EchartsInstance) => {
  window.onresize = () => {
    EchartsInstance.resize()
  }
}

provide('resizeEcharts', resizeEcharts)

</script>

<template>
  <div class="flex overflow-hidden bg-[url(./assets/imgs/bg.jpg)] bg-cover bg-center h-screen text-white p-5 ">
    <!--    左侧-->
    <div class="flex-1 flex flex-col bg-opacity-50 mr-5 bg-slate-800 p-3">
      <!--      横向柱状图-->
      <HorizontalBar class="h-1/3 box-border pb-4" :data="data?.regionData"></HorizontalBar>
      <!--      雷达图-->
      <RadarBar class="h-1/3 box-border pb-4" :data="data?.riskData"></RadarBar>
      <!--      关系图-->
      <Relation class=" h-1/3 " :data="data?.relationData"></Relation>
    </div>
    <!--    中间-->
    <div class="w-1/2 mr-5 flex flex-col">
      <TotalData class="bg-opacity-50 bg-slate-800  p-3 " :data="data?.totalData"></TotalData>
      <MapChart class="bg-opacity-50 bg-slate-800 mt-4 p-3 flex-1" :data="data?.mapData" ></MapChart>
    </div>
    <!--    右侧-->
    <div class="flex-1 flex flex-col bg-opacity-50  bg-slate-800 p-3">
      <!--      竖向柱状图-->
      <VerticalBar class="h-1/3 box-border pb-4" :data="data?.serverData"></VerticalBar>
      <!--      环形图-->
      <RingBar class="h-1/3 box-border pb-4" :data="data?.abnormalData"></RingBar>
      <!--      文档云图-->
      <WordCloud class="h-1/3" :data="data?.wordCloudData"></WordCloud>
    </div>

  </div>
</template>

<style scoped>
</style>
