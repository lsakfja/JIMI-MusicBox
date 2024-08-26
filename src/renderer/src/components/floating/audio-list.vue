<template>
    <div class="audio-list-box" :style="{ 'width' : props.sizeSetter + 'px' }">
        <div class="pop-upper">
            <div class="p-header">
                <span>{{ textList[uLang].play_list }}</span>
                <span id="count-span">{{ audioMsg.audiosList.length }}</span>
                <div class="clear-audio" @click="clearAudios()">
                    <img 
                        id="clear-icon" 
                        src="../../resources/icon/floating/clear.svg" 
                        alt=""
                    >
                    <span id="clear-span">{{ textList[uLang].play_clear }}</span>
                </div>
            </div>
            <hr>
            <div class="p-body">
                <div 
                    class="p-item"
                    v-for="(item, index) in audioMsg.audiosList" 
                    :key="index"
                    @mouseover="itemHovering(index)"
                    @mouseleave="itemUnHovering(index)"
                    @click="itemClick(index)"
                    :class="{'playing' : index == audioMsg.playingIndex ? true : false}"
                >
                    <img 
                        v-if="!(iconFlage[index] || false)" 
                        src="../../resources/icon/floating/item-run.svg" 
                        alt=""
                    >
                    <img 
                        v-else 
                        src="../../resources/icon/floating/run-solid.svg" 
                        alt=""
                    >
                    <span class="item-span">{{ item.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, reactive, ref } from "vue"

/* 打包音频设置 */
import { useAudioMsg } from '../../store/useAudioMsgStore'
const audioMsg = useAudioMsg()

/* 接收app函数 */
const props = defineProps({
    audioListStatus: Function,
    sizeSetter: Number,
    playFlag: Boolean,
    playOperator: Function,
})

/* 鼠标事件 */
const iconFlage = ref([])
function itemHovering(index){
    iconFlage.value[index] = true
}
function itemUnHovering(index){
    iconFlage.value[index] = false
}
function itemClick(index){
    //console.log(index, audioMsg.playingIndex);
    if(index !== audioMsg.playingIndex){
        audioMsg.listAndPlay(index)
        /* let temp = audioMsg.audiosList[index]
        audioMsg.audiosList[index] = audioMsg.audiosList[0]
        audioMsg.audiosList[0] = temp */

    }
}

function clearAudios(){
    audioMsg.sweapPlayer()
}


/* 注入app中标识符 */
const uLang = inject('uLang')
const textList = reactive({
    zh_CN: {
        'play_list': '播放清单',
        'play_clear': '清空',
    },
    zh_HK: {
        'play_list': '播放清單',
        'play_clear': '清空',

    },
    en: {
        'play_list': 'Play List',
        'play_clear': 'Clear',
    },
});

</script>

<style scoped>
.audio-list-box{
    position: absolute;
    transition: width .25s;   
    margin: 0;
    height: 500px;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
}

.audio-list-box .pop-upper{
    position: absolute; 
    height: 100%;
    width: 100%;
    right: 0; 
    border-radius: 10px 0 0 10px;
    overflow: hidden;
}

.audio-list-box .p-header{
    position: relative;
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 15px;
    white-space: nowrap;
}

.audio-list-box .p-header #count-span{
    position: relative;
    transform: translate(5px, -10px);
    font-size: 0.8rem;
}

.audio-list-box .p-header .clear-audio{
    position: absolute;
    right: 15px;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 5px;
}

.audio-list-box .p-header .clear-audio span{
    font-size: 0.75rem;
}

.audio-list-box .p-header .clear-audio img{
    height: 30%;
}

.audio-list-box .p-body{
    position: relative;
    width: 100%;
    height: 420px;
    box-sizing: border-box;
    padding-left: 15px;
    overflow-y: auto;
    margin-bottom: 5px;
}

.audio-list-box .p-body .p-item{
    position: relative;
    border-radius: 5px;
    width: 90%;
    height: 35px;
    display: flex;
    align-items: center;
    margin: 5px 0;
    transition: all .25s linear;
}

.audio-list-box .p-body .p-item.playing{
    background: linear-gradient(to right, rgba(204, 202, 208, 0.8), rgba(227, 224, 232, 0));
}

.audio-list-box .p-body .p-item:hover{
    border-radius: 5px;
    backdrop-filter: blur(5px);
    background: linear-gradient(to right, rgba(204, 202, 208, 0.8), rgba(227, 224, 232, 0));
}

.audio-list-box .p-body .p-item img{
    position: relative;
    height: 40%;
    margin-right: 5px;
}

.audio-list-box .p-body .p-item .item-span{
    display: inline-block;   
    max-width: 280px;        
    overflow: hidden;        
    white-space: nowrap;     
    font-size: 0.8rem;
    text-overflow: ellipsis; 
}

</style>