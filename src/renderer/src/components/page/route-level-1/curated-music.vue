<template>
    <div class="curated-send">
        <span>{{ textList[uLang].official_selection }}</span>
    </div>
</template>

<script setup>
import { inject, reactive, ref } from "vue";

/* 注入app中标识符 */
const uLang = inject('uLang')

const textList = reactive({
    zh_CN: {
        official_selection: '官方精选',
    },
    zh_HK: {
        official_selection: '官方精選',
    },
    en: {
        official_selection: 'Official Selection',
    },
});

</script>

<style scoped>
.curated-send{
    position: relative;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    font-size: 0.9rem;
}
</style>