<template>
    <div class="audio-player-floater">
        <!-- <button @click="setSrc()" id="test-btn">加载</button> -->
        <!-- <button @click="openFolder()">文件夹</button> -->
        <!-- <audio id="audio-player-tool" ref="audioTool" src="/src/resources/song-pack/audio/At The Edge.mp3" controls>NULL</audio> -->
        <!-- <audio src="/src/resources/song-pack/audio/At The Edge.mp3" controls></audio> -->
        <!-- <audio :src="packAudioList[2]" controls></audio> -->
        <!-- <button @click="audioPlayer()">run</button> -->
        <!-- <input type="text" v-model="a">
        <button @click="test()">test</button> -->
        <!-- <div><input type="text" v-focus></div> -->
        <div class="audio-msg" v-scroll>
            <!-- <span>123Test123Test123Test123Test123Test</span> -->
            <span>{{ 
                ((audioMsg.audioAimming.name != 'NULL') ? audioMsg.audioAimming.name : '')
            }}</span>
        </div>
        <div class="audio-controller">
            <div id="pre-btn" @click="audioMsg.checkNextAndPre('pre')" style="transform: rotate(180deg);">
                <img src="../../resources/icon/floating/switch.svg" alt="">
            </div>
            <div id="play-btn" @click="playStatus()">
                <img v-if="!audioMsg.isPlaying" src="../../resources/icon/floating/play-btn.svg" alt="">
                <img v-else src="../../resources/icon/floating/suspend-btn.svg" alt="">
            </div>
            <div id="next-btn" @click="audioMsg.checkNextAndPre('next')">
                <img src="../../resources/icon/floating/switch.svg" alt="">
            </div>
            <div id="progress-bar">
                <span id="current-span">{{ 
                    String(Math.floor(audioMsg.playingMsg.cruentLength / 60)).padStart(2, 0)
                    + ':' + 
                    String(Math.floor(audioMsg.playingMsg.cruentLength % 60)).padStart(2, 0)
                }}</span>
                <svg width="400" height="20" viewBox="0 0 400 20" preserveAspectRatio="xMidYMid meet">
                    <rect x="10" y="7.5" width="380" height="5" fill="#B0A8B9" rx="3"></rect>
                    <rect x="10" y="7.5" :width="380 * audioMsg.playingMsg.currentRaito" height="5" fill="#845EC2" rx="3"></rect>
                    <circle :cx="10 + 380 * audioMsg.playingMsg.currentRaito" cy="10" r="8" fill="#9B89B3"></circle>
                </svg>
                
                <span id="total-span">{{ 
                    String(Math.floor(audioMsg.playingMsg.totalLength / 60)).padStart(2, 0)
                    + ':' + 
                    String(Math.floor(audioMsg.playingMsg.totalLength % 60)).padStart(2, 0)
                }}</span>
            </div>
            
            <!-- {{ audioMsg.playingMsg }} -->
        </div>
        <div class="other-controller">
            <div class="icons-box">
                <img 
                    class="c-icon" 
                    src="../../resources/icon/floating/list.svg" alt=""
                    @click="props.audioListStatus()"
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, toRef, toRefs, watch } from "vue";

/* 使用自定义指令 */
import { _vScroll } from '../../directives/vScroll'
const vScroll = _vScroll
import { _vFocus } from '../../directives/vFocus'
const vFocus = _vFocus

/* 打包音频设置 */
import { useAudioMsg } from '../../store/useAudioMsgStore'
const audioMsg = useAudioMsg()

/* 接收app函数 */
const props = defineProps({
    audioListStatus: Function,
})


/* const a = ref(0)
function test(){
    console.log();
    audioMsg.audiosList[a.value].src.play()
} */

/* 音频Dom */
/* const audioTool = ref() 
function openFolder(){
    console.log("文件夹打开请求")
    window.ipcRenderer.send('open-local-file')
    
}
function localAudioPath(){
    window.ipcRenderer.on('send-local-music-path', (e, path)=>{
        audioTool.value.src = `customfile://${encodeURIComponent(path)}`;
        console.log(path);
     
    })
} */

const packAudioList = reactive([])
const audioCounts = ref(0)
function getPackagesAudios(){
    console.log("接收音频路径");
    audoPathLogger()
    window.ipcRenderer.send('get-packages-audio')
    window.ipcRenderer.on('send-audio-map', (e, audioMap)=>{
        //console.log(audioMap[0]);
        packAudioList.length = 0
        for(let i=0; i<audioMap.length; i++){
            // 将路径中的反斜杠替换为正斜杠，确保在URL中有效
            let relativePath = audioMap[i].replace(/\\/g, '/');
            // 使用 `file://` 协议
            let filePath = `file://${relativePath}`;
            packAudioList.push(filePath);
            //console.log(filePath);
        }
        audioMsg.countAudios(audioMap.length)
        audioMsg.audioPathSetter(packAudioList)


    })

    
}

function audoPathLogger(){
    window.ipcRenderer.send('log-audio-path')
    window.ipcRenderer.on('return-audio-path', (e, audioPath)=>{
        console.log("主进程消息,路径解析:", audioPath);
    })
}

/* 播放状态修饰 */
function playStatus(){
    audioMsg.playReset()
}




/* 生命周期 */
onMounted(()=>{
    getPackagesAudios()
    
})

</script>

<style scoped>
@import url('../nav/nav-css.css');
.audio-player-floater{
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: var(--bottom-floater-height);
    z-index: 999;
    box-shadow: 0px -4px 5px -5px black;
}

.audio-player-floater .audio-msg{
    position: relative;
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
}


.audio-player-floater .audio-controller{
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0%);
    width: 50%;
    height: 100%;
}

.audio-player-floater .audio-controller #play-btn{
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -30%);
    border-radius: 50%;
    height: 45px;
    width: 45px;
    background-color: rgb(121, 125, 248);
    display: flex;
    justify-content: center;
    align-items: center;
}

.audio-player-floater .audio-controller #current-span{
    position: absolute;
    font-size: 0.55rem;
    left: -35px;
    transform: translateY(-1px);
}

.audio-player-floater .audio-controller #total-span{
    position: absolute;
    font-size: 0.55rem;
    right: -35px;
    transform: translateY(-1px);
}

.audio-player-floater .audio-controller #progress-bar{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 20px;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, -25%);
}

.audio-player-floater .audio-controller #play-btn img{
    position: absolute;
    width: 85%;
    height: 85%;
}

.audio-player-floater .audio-controller #next-btn,
.audio-player-floater .audio-controller #pre-btn{
    position: absolute;
    border-radius: 50%;
    top: 15%;
    height:45px;
    width: 45px;
    /* background-color: #797df8; */
    --shifting: 35%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.audio-player-floater .audio-controller #next-btn img,
.audio-player-floater .audio-controller #pre-btn img{
    width: 85%;
}
.audio-player-floater .audio-controller #pre-btn{
    left: var(--shifting);
}
.audio-player-floater .audio-controller #next-btn{
    right: var(--shifting);
}




.audio-player-floater .other-controller{
    position: absolute;
    top: 0px;
    right: 0px;
    width: 20%;
    height: 100%;
}

.audio-player-floater .other-controller .icons-box{
    position: absolute;
    right: 0px;
    height: 100%;
    width: 80%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
}

.audio-player-floater .other-controller .icons-box .c-icon{
    position: relative;
    height: 50%;
    margin: 0 10px;
}
</style>

<!-- 测试css -->
<style scoped>
#test-btn{
    position: relative;
    left: 0;
    height: 100%;
    width: 60px;
}

</style>
