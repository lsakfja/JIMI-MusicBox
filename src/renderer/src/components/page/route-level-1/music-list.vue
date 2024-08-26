<template>
    <div class="music-list center-same">
        <div class="music-list-header" ref="mlhDom">
            <div class="header-carousel" :style="{ 'width': carouselWidth }">
                <el-carousel :height="carouselHeight">
                    <!-- <el-carousel-item v-for="(item, index) in scrollImg" :key="index">
                        <img :src="item" alt="">
                    </el-carousel-item> -->
                    <el-carousel-item>
                        <img src="/src/resources/icon/scroll-img/music-list/igs.jpg" alt="">
                    </el-carousel-item>
                    <el-carousel-item>
                        <img src="/src/resources/icon/scroll-img/music-list/haishichouni.jpg" alt="">
                    </el-carousel-item>
                    <el-carousel-item>
                        <img src="/src/resources/icon/scroll-img/music-list/xuwuyanhuo.jpg" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="header-content">
                <div class="time-span">
                    <!-- <span>{{ textList[uLang].welcoming_speech }}</span> -->
                    <!-- :src="timeIcon[timeSlot]" -->
                    <img :src="timeIcon[timeSlot]" alt="">
                    <span>{{ textList[uLang][timeSlot] }}</span>
                    <span>{{ headerData.time.hour }}</span>
                    <span>{{ ":" }}</span>
                    <span>{{ String(headerData.time.minite).padStart(2, 0) }}</span>
                    <span>{{ ":" }}</span>
                    <span>{{ String(headerData.time.second).padStart(2, 0) }}</span>
                </div>
                <div class="weather-span">
                    <div class="weather-item">
                        <img src="../../../resources/icon/center-nav/province.svg" alt="">
                        <span>{{ weatherData.data.province }}</span>
                        <span>{{ weatherData.data.city }}</span>
                    </div>
                    <div class="weather-item">
                        <!-- weatherIcon[weatherData.data.weather] -->
                        <img :src="weatherIcon[weatherData.data.weather]" alt="">
                        <span>{{ weatherData.data.weather }}</span>
                        <img src="../../../resources/icon/center-nav/temperatrue.svg" alt="">
                        <span>{{ weatherData.data.temperature }}</span>
                        <img src="../../../resources/icon/center-nav/humidity.svg" alt="">
                        <span>{{ weatherData.data.humidity }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="music-list-body">
            <div class="body-area">
                <div class="top-area">
                    <span class="item-index">{{ "#" }}</span>
                    <span>{{ textList[uLang].song_name }}</span>
                </div>
                <hr>
                <div class="audio-list">
                    <div 
                        class="audio-item" 
                        :class="{'item-hovered' : true}"
                        v-for="(item, index) in audioPath" 
                        :key="index"
                        @mouseover="itemHovering(index)"
                        @mouseleave="itemUnHovering(index)"
                    >
                        <span class="item-index" v-if="!(iconFlage[index] || false)">{{ index + 1 }}</span>
                        <img 
                            class="play-icon" 
                            v-else src="../../../resources/icon/center-nav/play.svg"
                            @click="playSetter(index, audioName[index])"
                        >
                        <span class="audio-name">{{ audioName[index] }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ElMessage } from 'element-plus'
import { inject, nextTick, onMounted, onUnmounted, reactive, ref, toRef } from "vue";

/* 导入组件 */

/* 打包音频设置 */
import { useAudioMsg } from '../../../store/useAudioMsgStore'
const audioMsg = useAudioMsg()
const audioPath = toRef(audioMsg.packAudioList)

/* 注入app中标识符 */
const uLang = inject('uLang')

/* 头部走马灯装配区 */
const carouselHeight = ref()
const carouselWidth = ref()
const scrollImg = reactive([
    '/src/resources/icon/scroll-img/music-list/igs.jpg',
    '/src/resources/icon/scroll-img/music-list/haishichouni.jpg',
    '/src/resources/icon/scroll-img/music-list/xuwuyanhuo.jpg',
])
const mlhDom = ref()
function getHeaderHeight(){
    carouselHeight.value = getComputedStyle(mlhDom.value).height
    let executing = carouselHeight.value.split('')
    executing.pop()
    executing.pop()
    let result = executing.join('')
    carouselWidth.value = Number(result) * 16 / 9 + 'px'
}

/* 头部信息装配区 */
const timeSlot = ref()
const headerData = reactive({
    dateMsg: new Date(),
    time: {
        year: null,
        month: null,
        day: null,
        hour: null,
        minite: null,
        second: null,
    },
    weather: null,
})
const timeSection = reactive({
    Midnight: [0, 259],        // 00:00 - 02:59
    Early_Morning: [300, 559], // 03:00 - 05:59
    Morning: [600, 859],       // 06:00 - 08:59
    Mid_Morning: [900, 1159],  // 09:00 - 11:59
    Noon: [1200, 1259],        // 12:00 - 12:59
    Early_Afternoon: [1300, 1459], // 13:00 - 14:59
    Late_Afternoon: [1500, 1759],  // 15:00 - 17:59
    Evening: [1800, 2059],     // 18:00 - 20:59
    Night: [2100, 2359]        // 21:00 - 23:59
})
function colokBuilder(){
    timeSetter()
    let myColok = setInterval(timeSetter, 1000)
    function timeSetter(){
        headerData.dateMsg = new Date()
        headerData.time.year = headerData.dateMsg.getFullYear()
        headerData.time.month = headerData.dateMsg.getMonth() + 1
        headerData.time.day = headerData.dateMsg.getDate()
        headerData.time.hour = headerData.dateMsg.getHours()
        headerData.time.minite = headerData.dateMsg.getMinutes()
        headerData.time.second = headerData.dateMsg.getSeconds()
        timeCheck()
    }
    function timeCheck(){
        let target = String(headerData.time.hour) + String(headerData.time.minite).padStart(2, 0)
        for(let t in timeSection){
            if(target >= timeSection[t][0] && target <= timeSection[t][1]){
                timeSlot.value = t
            }
        }
    }
}

const weatherIcon = reactive({
    '晴': '/src/resources/icon/weather/sunny.svg',
    '少云':  '/src/resources/icon/weather/',
    '晴间多云':  '/src/resources/icon/weather/',
    '多云':  '/src/resources/icon/weather/cloudy.svg',
    '阴':  '/src/resources/icon/weather/cloudy.svg',
    '阵雨':  '/src/resources/icon/weather/shower.svg',
    '有风':  '/src/resources/icon/weather/',
    '平静':  '/src/resources/icon/weather/',
    '微风':  '/src/resources/icon/weather/',
    '和风':  '/src/resources/icon/weather/',
    '清风':  '/src/resources/icon/weather/',
    '强风':  '/src/resources/icon/weather/',
    '劲风':  '/src/resources/icon/weather/',
    '疾风':  '/src/resources/icon/weather/',
    '大风':  '/src/resources/icon/weather/',
    '烈风': '/src/resources/icon/weather',
    '风暴': '/src/resources/icon/weather',
    '狂爆风': '/src/resources/icon/weather',
    '飓风': '/src/resources/icon/weather',
    '热带风暴': '/src/resources/icon/weather',
    '霾': '/src/resources/icon/weather',
    '中度霾': '/src/resources/icon/weather',
    '重度霾': '/src/resources/icon/weather',
    '严重霾': '/src/resources/icon/weather',
})
const gdKey = ref('844e978fda39a87362de979b2dc10e13')
const cityCode = ref('530102')
const weatherUrl = ref(`https://restapi.amap.com/v3/weather/weatherInfo?key=${gdKey.value}&city=${cityCode.value}`) 
const weatherData = reactive({
  data: ''  
})
function getWeather(key){
    console.log("天气get函数接收中");
    
    if(key === 'load'){
        window.ipcRenderer.removeListener('respone-weather-result', weatherHandle);
        console.log("加载天气请求");
        window.ipcRenderer.send('send-url', weatherUrl.value)
        window.ipcRenderer.on('respone-weather-result', weatherHandle)
    }else if(key === 'unLoad'){
        console.log("卸载天气请求");
        window.ipcRenderer.removeListener('respone-weather-result', weatherHandle);
    }
}
function weatherHandle(e, result){
    console.log(result);
    weatherData.data = result[0];
}


/* item鼠标事件 */
const iconFlage = ref([])
function itemHovering(index){
    iconFlage.value[index] = true
}
function itemUnHovering(index){
    iconFlage.value[index] = false
}
/* function playAdder(index, name){
    audioMsg.aduioSelector(index, name)
} */
let lastTime = 0
function playSetter(index, audioName){
    let now = Date.now()
    if(now - lastTime >= 1000){
        lastTime = now
        //audioMsg.aduioSelector(index, audioName)
        //audioMsg.audioListPusher(index, audioName)
        audioMsg.selectAndPlay(index, audioName)
        showMsg('add_audio')
    }else{
        showMsg('quick-click')
    }
}
function showMsg(t){
    if(t === 'add_audio'){
        ElMessage({
            message: textList[uLang.value].add_list,
            type: 'success',
            offset: 100,
        })
    }else if(t === 'quick-click'){
        ElMessage({
            message: textList[uLang.value].quick_click,
            type: 'warning',
            offset: 100,
        })
    }
    
}

/* 曲名拆解 */
const audioName = reactive([])
async function subPath(){
    //console.log("剪切中");
    if(audioPath.value.length == 0){
        //console.log("尚未加载完毕");
        setTimeout(subPath, 500)
        return
    }
    audioName.length = 0
    for(let path of audioPath.value){
        let target1 = path.lastIndexOf("/audio/")
        let t1 = path.substring(target1 + 7)
        let target2 = t1.lastIndexOf('.')
        let t2 = t1.substring(target2)
        audioName.push(path.substring(target1 + 7).replace(t2,  ''))
    }
}

const timeIcon = reactive({
    Midnight: '/src/resources/icon/center-nav/midnight.svg',        // 00:00 - 02:59
    Early_Morning: '/src/resources/icon/center-nav/early-moring.svg', // 03:00 - 05:59
    Morning: '/src/resources/icon/center-nav/early-moring.svg',       // 06:00 - 08:59
    Mid_Morning: '/src/resources/icon/center-nav/early-moring.svg',  // 09:00 - 11:59
    Noon: '/src/resources/icon/center-nav/noon.svg',        // 12:00 - 12:59
    Early_Afternoon: '/src/resources/icon/center-nav/early-noon.svg', // 13:00 - 14:59
    Late_Afternoon: '/src/resources/icon/center-nav/late-afternoon.svg',  // 15:00 - 17:59
    Evening: '/src/resources/icon/center-nav/evening.svg',     // 18:00 - 20:59
    Night: '/src/resources/icon/center-nav/night.svg'       // 21:00 - 23:59
})
const textList = reactive({
    zh_CN: {
        song_name: '曲名',
        add_list: '加入播放列表',
        welcoming_speech: '现在是:',
        Midnight: '午夜',
        Early_Morning: '凌晨',
        Morning: '早晨',
        Mid_Morning: '上午',
        Noon: '中午',
        Early_Afternoon: '午后',
        Late_Afternoon: '傍晚',
        Evening: '黄昏',
        Night: '夜晚',
        quick_click : '点击过快',
    },
    zh_HK: {
        song_name: '曲名',
        add_list: '加入播放清單',
        welcoming_speech: '現在是:',
        Midnight: '午夜',
        Early_Morning: '凌晨',
        Morning: '早晨',
        Mid_Morning: '上午',
        Noon: '中午',
        Early_Afternoon: '午后',
        Late_Afternoon: '傍晚',
        Evening: '黃昏',
        Night: '夜晚',
        quick_click : '點擊過快',
    },
    en: {
        song_name: 'Music Name',
        add_list: 'Add to playlist',
        welcoming_speech: 'The current time is:',
        Midnight: 'Midnight',
        Early_Morning: 'Early Morning',
        Morning: 'Morning',
        Mid_Morning: 'Mid Morning',
        Noon: 'Noon',
        Early_Afternoon: 'Early Afternoon',
        Late_Afternoon: 'Late Afternoon',
        Evening: 'Evening',
        Night: 'Night',
        quick_click : 'Click too fast',
    }
});

function packageTest(){
    console.log("打包测试");
    
}


/* 生命周期 */
onMounted(async()=>{
    await nextTick()
    getHeaderHeight()
    colokBuilder()
    getWeather('load')
    subPath()
    //packageTest()
    window.addEventListener('resize', getHeaderHeight)
})
onUnmounted(()=>{
    getWeather('unLoad')
    window.removeEventListener('resize', getHeaderHeight)
})

</script>

<style scoped>
.music-list {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    font-size: 0.9rem;
}
.music-list-header{
    position: relative;
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 40%;
}
.music-list-body{
    position: relative;
    box-sizing: border-box;
    top: 5%;
    width: 100%;
    height: 50%;
}
.music-list-header .header-carousel{
    position: relative;
    height: 100%;
    border-radius: 20px;
    left: 0;
    flex-shrink: 0;
    overflow: hidden;
}
.music-list-header .header-carousel img{
    position: relative;
    height: 100%;
    width: 100%;
}
.music-list-header .header-content{
    position: relative;
    height: 100%;
    width: auto;
    flex-grow: 1;
    box-sizing: border-box;
    padding-left: 20px;
}
.music-list-header .header-content .time-span{
    position: relative;
    /* max-width: 400px; */
    min-width: 380px;
    width: 90%;
    height: 35%;
    box-sizing: border-box;
    padding: 5px;
    margin-right: 5px;
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.music-list-header .header-content .weather-span{
    position: relative;
    top: 5%;
    min-width: 380px;
    width:90%;
    height: 60%;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 5px;
}
.music-list-header .header-content .weather-span .weather-item{
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.music-list-header .header-content .time-span img,
.music-list-header .header-content .weather-span img{
    width: 30px;
    height: 30px;
    margin: 10px;
}
.music-list-header .header-content .time-span span,
.music-list-header .header-content .weather-span span{
    position: relative;
    font-size: 1.2rem;
    text-align: center;
    margin-right: 5px;
    font-weight: bold;
}

.music-list-body .body-area{
    position: relative;
    width: 100%;
    height: 100%;
}

.music-list-body .body-area .top-area,
.music-list-body .body-area .audio-list .audio-item{
    padding: 5px;
    padding-left: 8px;
}

.music-list-body .body-area .top-area{
    position: relative;
    height: 10%;
    font-size: 1.1rem;
}

.music-list-body .body-area .audio-list{
    position: relative;
    width: 100%;
    height: 90%;
    overflow-y: auto;
}

.music-list-body .body-area .audio-list .audio-item{
    position: relative;
    margin-top: 5px;
    box-sizing: border-box;
    height: 45px;
    transition: .25s;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    z-index: 0;
}

.music-list-body .body-area .audio-list .audio-item:hover{
    border-radius: 12px;
    backdrop-filter: blur(5px);
    background: linear-gradient(to right, rgba(227, 224, 232, 0.8), rgba(227, 224, 232, 0));
}

.music-list-body .body-area .audio-list .audio-item:hover .audio-name{
    transition: .25s;
}


.music-list-body .body-area .audio-list .audio-item:hover .audio-name{
    transform: translateX(-10px);
}

.music-list-body .body-area .audio-list .audio-item .item-index,
.music-list-body .body-area .item-index,
.music-list-body .body-area .play-icon{
    transition: 0.3s;
    display: inline-block;
    width: 30px;
    margin-right: 15px;
}

.music-list-body .body-area .play-icon:hover{
    background-color: rgb(41, 41, 41);
    border-radius: 50%;
}

.music-list-body .body-area .play-icon:active{
    background-color: aliceblue;
}

</style>