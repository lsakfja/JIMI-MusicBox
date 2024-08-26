<template>
    <div class="play-history">
        <div class="selector-span-area">
            <span class="selector-span">{{ textList[uLang].single }}</span>
            <span>{{ textList[uLang].playlist }}</span>


        </div>
    </div>
</template>

<script setup>
import { inject, reactive } from "vue"

/* 注入app中标识符 */
const uLang = inject('uLang')

const textList = reactive({
    zh_CN: {
        play_history: '播放记录',
        single: '单曲',
        playlist: '歌单',
    },
    zh_HK: {
        play_history: '播放記錄',
        single: '單曲',
        playlist: '歌單',
    },
    en: {
        play_history: 'Play History',
        single: 'Single',
        playlist: 'Playlist',
    },
});

</script>

<style scoped>
.play-history{
    position: relative;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    font-size: 0.9rem;
}
.selector-span-area{
    position: relative;
    font-size: 0.8rem;
}
.selector-span{
    margin-right: 10px;
}
</style>