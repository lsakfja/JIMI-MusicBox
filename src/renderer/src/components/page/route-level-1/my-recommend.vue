<template>
    <div class="music-send  center-same">
        <span>{{ textList[uLang].music_send }}</span>
        

    </div>

</template>

<script setup>
import { inject, onMounted, reactive, ref } from "vue";
import { plainAxios, instance } from '../../../axios/simple-axios';

/* 注入app中标识符 */
const uLang = inject('uLang')


const textList = reactive({
    zh_CN: {
        music_send: '音乐推送',
    },
    zh_HK: {
        music_send: '音樂推送',
    },
    en: {
        music_send: 'Music Send',
    },
})


</script>

<style scoped>
.music-send{
    position: relative;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    font-size: 0.9rem;
}

</style>