<template>
    <div class="top-navigation app-div">
        <!-- 顺序-从右至左 -->
        <div id="img-group-1" class="img-group">
            <img src="../../resources/icon/top-nav/move.svg" alt="" class="icon-img" id="move-icon" @click="ipcToMain('do-min-size-main-window', 'null')">
            <img v-if="zoomFlag" src="../../resources/icon/top-nav/square.svg" alt="" class="icon-img" id="square-icon" @click="ipcToMain('do-max-size-main-window', 'null'), zoomFlag = false">
            <img v-else src="../../resources/icon/top-nav/zoom.svg" alt="" class="icon-img" id="zoom-icon" @click="ipcToMain('do-zoom-main-window', 'withing'), zoomFlag = true">
            <img src="../../resources/icon/top-nav/close.svg" alt="" class="icon-img" id="close-icon" @click="ipcToMain('do-close-all-window', 'null')">
        </div>
        <div class="boundary"></div>
        <div id="img-group-2" class="img-group">
            <img src="../../resources/icon/top-nav/letter.svg" alt="" class="icon-img" id="letter-icon">
            <img src="../../resources/icon/top-nav/skin.svg" alt="" class="icon-img" id="skin-icon" @click="navToSkin()">
            <img src="../../resources/icon/top-nav/setting.svg" alt="" class="icon-img" id="setting-icon" @click="navToSetting()">
        </div>
        <div class="boundary"></div>
        <div id="img-group-3" class="img-group">
            <img src="../../resources/icon/top-nav/vip.svg" alt="" class="icon-img" id="vip-icon">
            <img src="../../resources/icon/top-nav/down-arrow.svg" alt="" class="icon-img" id="down-arrow-icon">
        </div>
        <div class="boundary"></div>
        <div id="img-group-4" class="img-group">
            <img src="../../resources/icon/top-nav/user.svg" alt="" class="icon-img" id="user-icon">
        </div>
        <div class="operate-line">
            <div class="back-btn">
                <img src="../../resources/icon/top-nav/left-arrow.svg" alt="" class="icon-img" id="left-arrow-icon">
            </div>
            <div class="input-div">
                <img src="../../resources/icon/top-nav/serach.svg" alt="" class="icon-img" id="serach-icon">
                <input type="text" id="input-music" v-model="serach_music">
                <img src="../../resources/icon/top-nav/clear.svg" alt="" class="icon-img" id="clear-icon">
            </div>
        </div>
    </div> 
</template>

<script setup>
import { inject, reactive, ref } from "vue";
/* 导入路由 */
import router from '../../router/index'

/* 注入app中标识符 */
const navFlag = inject('navFlag')
const uLang = inject('uLang')


/* 标识符变化 */
function navFlagUpdate(){
    navFlag.value = 'navTop'
}

/* 窗口状态 */
const zoomFlag = ref(true)
const wSize = reactive({
    width: 1074,
    height: 756,
})

const serach_music = ref('')
/* ipc通信 */
function ipcToMain(target, val){
    console.log("渲染进程->发送消息");
    if(val === 'null'){
        window.ipcRenderer.send(target)
    }else{
        let size ={
            x: wSize.width, 
            y: wSize.height
        }
        window.ipcRenderer.send(target, size)
    }
}


/* 前往主题界面 */
function navToSkin(){
    router.push('/theme-toggle')
    navFlagUpdate()
}
/* 前往设置界面 */
function navToSetting(){
    router.push('/local-setting')
    navFlagUpdate()
}

</script>



<style scoped>
@import url("./nav-css.css");
.top-navigation{
    position: absolute;
    left: var(--left-nav-width);
    width: calc(100% - var(--left-nav-width));
    height: var(--top-nav--height);
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    align-items: center;
    padding: 0px 15px;
    -webkit-app-region: drag;
}
.img-group{
    position: relative;
    height: 20px;
    width: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.icon-img{
    height: 100%;
    aspect-ratio: 1;
    margin: 0px 8px;
    -webkit-app-region: no-drag;
}
.icon-img:hover{
    filter: brightness(1.4);
}
.boundary{
    position: relative;
    border: 1px solid #87878A;
    height: 15px;
}


/* 操作行设置 */
.operate-line{
    position: absolute;
    left: 0px;
    box-sizing: border-box;
    padding: 10px;
    height: 100%;
    display: flex;
    align-items: center;
}
.back-btn, .input-div{
    height: 85%;
}
.back-btn{
    position: relative;
    border: 1px solid #87878A;
    border-radius: 7px;
    margin-right: 5px;
    background-color: transparent;
}
.input-div{
    position: relative;
    border-radius: 5px;
    background-color: transparent;
    border: 1px solid #87878A;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    -webkit-app-region: no-drag;
}
.input-div input{
    background-color: transparent;
    border: 0px solid transparent;
    outline: none;
    font-size: 0.9rem;
}
.back-btn:hover{
    background-color: rgba(135, 135, 138, 0.3);
}


/* 图标单独设置 */
#square-icon{
    height: 90%;
}
#letter-icon{
    height: 130%;
}
#vip-icon{
    height: 85%;
}
#user-icon{
    height: 110%;
}
#left-arrow-icon{
    margin: 0px;
}
#serach-icon, #clear-icon{
    height: 60%;
}




</style>