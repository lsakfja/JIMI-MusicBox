<script setup>
import { provide, reactive, ref, toRef, toRefs, watch } from 'vue';
/* 导航组件 */
import navLeft from './components/nav/nav-left.vue';
import navTop from './components/nav/nav-top.vue';
import navCenter from './components/nav/nav-center.vue';
/* 悬浮组件 */
import audioPlayer from './components/floating/audio-player.vue'
import aduioList from './components/floating/audio-list.vue'
/* 导入ui模式标志 */
import { useColorMode } from './store/useColorModeStore.js'
const uiCmode =  useColorMode()
const { nowTarget } = toRefs(uiCmode)
/* 导出语言标志 */
import { useLangStore } from './store/useLangStore'
import { useRoute } from 'vue-router';
import router from './router';
const useLang = useLangStore()
const { uLang } = toRefs(useLang)

/* 在left-nav与top-nav间维持一个标识符 */
const navFlag = ref('left-nav')
provide('navFlag', navFlag)
/* 向所有后代组件发送语言标识符 */
provide('uLang', uLang)

/* 路由信息 */
const routerMsg = useRoute()
/* 设置初始路径 */
function initRouterPath(){
  router.push('/music-list')
}
initRouterPath()

/* 悬浮窗交互配置 */
/* 歌单悬浮窗开关 */
let pCount = 0
let pSize = [0, 350]
const sizeSetter = ref(-100)
function audioListStatus(){
  console.log("状态修改");
  pCount = (pCount + 1) % 2
  sizeSetter.value = pSize[pCount]
}
/* 播放/歌单悬浮窗交互 */
const playFlag = ref(false)
function playOperator(index, src){
  console.log(index, src);
  
}


</script>

<template>
  <div class="root-div"  :class="nowTarget.name">
    <!-- 左侧导航 -->
    <navLeft>
      
    </navLeft>
    <!-- 上方导航 -->
    <navTop>

    </navTop>
    <!-- 中心导航 -->
    <navCenter>
      <!-- <button @click="uiCmode.updateMode(0)">默认</button>
      <button @click="uiCmode.updateMode(1)">点雅黑</button>
      <button @click="uiCmode.updateMode(2)">经典红</button> -->
    </navCenter>
    <!-- 播放音乐时出现的底部悬浮窗口 -->
    <audioPlayer 
      :audioListStatus="audioListStatus"
      :playOperator="playOperator"
      :playFlag="playFlag"
    ></audioPlayer>
    <!-- 播放列表悬浮窗口 -->
    <aduioList 
      :audioListStatus="audioListStatus"
      :sizeSetter="sizeSetter"
      :playOperator="playOperator"
      :playFlag="playFlag"
    ></aduioList>

  </div>
</template>

<style lang="less">
/* 公共css */
@import './components/nav/nav-css.css';
@import './assets/css/styles.less';
/* 配色方案 */
@import url('./assets/css/uiColor/default.css');
@import url('./assets/css/uiColor/elegant-black.css');
@import url('./assets/css/uiColor/classic-red.css');
@import url('./assets/css/uiColor/fresh-green.css');

.app-div{
  box-sizing: border-box;
}
.center-set{
  height: calc(100% - 250px);
}

</style>
