<template>
    <div class="theme-page">
        <div class="switch-line">
            <span class="switch-item">{{ textList[uLang].custom_theme }}</span>
            <span class="switch-item">{{ textList[uLang].avatar_pendant }}</span>
        </div>
        <div class="theme-area">
            <div class="theme-line">
                <div class="theme-item" id="theme-default" @click="uiCmode.updateMode(0)">
                    <span>{{ textList[uLang].theme_default }}</span>
                    <img src="../../../resources/icon/theme-toggle-icon/music-albums.svg" alt="" class="theme-icon">
                </div>
                <div class="theme-item" id="theme-elegant-black" @click="uiCmode.updateMode(1)">
                    <span>{{ textList[uLang].theme_elegant_black }}</span>
                    <img src="../../../resources/icon/theme-toggle-icon/music-albums.svg" alt="" class="theme-icon">
                </div>
                <div class="theme-item" id="theme-classic-red"  @click="uiCmode.updateMode(2)">
                    <span>{{ textList[uLang].theme_classic_red }}</span>
                    <img src="../../../resources/icon/theme-toggle-icon/music-albums.svg" alt="" class="theme-icon">
                </div>
                <div class="theme-item" id="theme-fresh-green"  @click="uiCmode.updateMode(3)">
                    <span>{{ textList[uLang].theme_fresh_green }}</span>
                    <img src="../../../resources/icon/theme-toggle-icon/music-albums.svg" alt="" class="theme-icon">
                </div>
            </div>
            <div class="theme-line">

            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, reactive, ref } from "vue";
/* 导入ui模式库 */
import { useColorMode } from '../../../store/useColorModeStore'
const uiCmode =  useColorMode()

/* 注入app中标识符 */
const uLang = inject('uLang')
const textList = reactive({
    zh_CN: {
        custom_theme: '个性主题',
        avatar_pendant: '头像挂件',
        theme_default: '默认',
        theme_elegant_black: '典雅黑',
        theme_classic_red: '经典红',
        theme_fresh_green: '清新绿',
        theme_custom_theme: '自定义主题',
    },
    zh_HK: {
        custom_theme: '個性主題',
        avatar_pendant: '頭像掛件',
        theme_default: '默認',
        theme_elegant_black: '優雅黑',
        theme_classic_red: '經典紅',
        theme_fresh_green: '清新綠',
        theme_custom_theme: '自定義主題',
    },
    en: {
        custom_theme: 'Custom Theme',
        avatar_pendant: 'Avatar Pendant',
        theme_default: 'Default',
        theme_elegant_black: 'Elegant Black',
        theme_classic_red: 'Classic Red',
        theme_fresh_green: 'Fresh Green',
        theme_custom_theme: 'Custom Theme',
    },
});

</script>

<style scoped>
.theme-page{
    position: relative;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    font-size: 0.9rem;
}
.switch-line{
    position: relative;
    width: 100%;
    height: 30px;
}
.switch-item{
    margin-right: 10px;
}
.theme-area{
    position: relative;
    width: 100%;
    height: calc(100% - 30px);
    overflow: auto;
}
.theme-line{
    position: relative;
    width: 100%;
    height: 50%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
.theme-item{
    position: relative;
    border-radius: 15px;
    border: 1px solid gainsboro;
    flex-shrink: 0;
    aspect-ratio: 6/5;
    width: 20%;
}
.theme-icon{
    position: absolute;
    right: 5%;
    bottom: 5%;
    aspect-ratio: 1;
    height: 40%;
    transition: all .5s ease;
}
.theme-item:hover .theme-icon{
    right: 13%;
    height: 50%;
}
.theme-item span{
    position: absolute;
    bottom: -20%;
    left: 16%;
}

/* item颜色配置 */
#theme-default{
    background-color: #FFF;
}
#theme-elegant-black{
    background-color: rgb(26, 26, 33);
}
#theme-classic-red{
    background-color: rgb(234, 58, 58);
}
#theme-fresh-green{
    background-color: rgb(120, 180, 120);
}

</style>