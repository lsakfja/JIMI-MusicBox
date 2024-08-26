<template>
    <div class="my-favorite">
        <span>{{ textList[uLang].favorite }}</span>
    </div>
</template>

<script setup>
import { inject, reactive } from "vue"

/* 注入app中标识符 */
const uLang = inject('uLang')
const textList = reactive({
    zh_CN: {
        favorite: '我的收藏',
    },
    zh_HK: {
        favorite: '我的收藏',
    },
    en: {
        favorite: 'My Favorites',
    },
});

</script>

<style scoped>
.my-favorite{
    position: relative;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    font-size: 0.9rem;
}
</style>