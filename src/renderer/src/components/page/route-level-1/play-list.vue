<template>
    <div class="play-list">
        <span>{{ textList[uLang].play_list }}</span>
    </div>
</template>

<script setup>
import { inject, reactive } from "vue"

/* 注入app中标识符 */
const uLang = inject('uLang')
const textList = reactive({
    zh_CN: {
        play_list: '我的歌单',
    },
    zh_HK: {
        play_list: '我的歌單',
    },
    en: {
        play_list: 'My PlayList',
    },
})
</script>

<style scoped>
.play-list{
    position: relative;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    font-size: 0.9rem;
}
</style>