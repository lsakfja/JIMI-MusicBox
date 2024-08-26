<template>
    <div class="left-navigation app-div">
        <div class="left-header">
            <img src="../../resources/icon/left-nav/music.svg" alt="" class="item-icon" id="item-icon-music">
            <span>{{ textList[uLang].music_box }}</span>
        </div>
        
        <div class="left-selector">
            <!-- 分类1 -->
            <div class="left-item" id="list" @click="check('musicList', '/music-list')" :class="{'checked': selectList.musicList}">
                <div class="img-box">
                    <img src="../../resources/icon/left-nav/list.svg" alt="" class="item-icon" id="item-icon-music-list">
                </div>
                <span class="item-text">{{ textList[uLang].music_list }}</span>
            </div>
            <div class="left-item" id="recommend" @click="check('recommend', '/my-recommend')" :class="{'checked': selectList.recommend}">
                <div class="img-box">
                    <img src="../../resources/icon/left-nav/recommendright.svg" alt="" class="item-icon" id="item-icon-recommend">
                </div>
                <span class="item-text">{{ textList[uLang].recommend }}</span>
            </div>
            <div class="left-item" id="curated" @click="check('curated', '/curated-music')" :class="{'checked': selectList.curated}">
                <div class="img-box">
                    <img src="../../resources/icon/left-nav/music-curated.svg" alt="" class="item-icon" id="item-icon-send">
                </div>
                <span class="item-text">{{ textList[uLang].curated }}</span>
            </div>

            <hr class="item-hr">

            <!-- 分类2 -->
            <div class="left-item" id="my-favorite" @click="check('favorite', '/my-favorite')" :class="{'checked': selectList.favorite}">
                <div class="img-box">
                    <img src="../../resources/icon/left-nav/favorite.svg" alt="" class="item-icon" id="item-icon-favorite">
                </div>
                <span class="item-text">{{ textList[uLang].favorite }}</span>
             </div>
             <div class="left-item" id="play-history" @click="check('playHistory', '/play-history')" :class="{'checked': selectList.playHistory}">
                <div class="img-box">
                    <img src="../../resources/icon/left-nav/history.svg" alt="" class="item-icon" id="item-icon-history">
                </div>
                <span class="item-text">{{ textList[uLang].play_history }}</span>
            </div>
             <div class="left-item" id="play-list" @click="check('playList', '/play-list')" :class="{'checked': selectList.playList}">
                <div class="img-box">
                    <img src="../../resources/icon/left-nav/play-list-line.svg" alt="" class="item-icon" id="item-icon-play-list">
                </div>
                <span class="item-text">{{ textList[uLang].playlist }}</span>
            </div>
        </div>

    </div>    
</template>

<script setup>
import { inject, reactive, ref, watch } from 'vue';
import router from '../../router/index'
/* 注入app中标识符 */
const navFlag = inject('navFlag')
const uLang = inject('uLang')

/* 标识符变化 */
function navFlagUpdate(){
    navFlag.value = 'navLeft'
}
watch(navFlag, ()=>{
    if(navFlag.value !== 'navLeft'){
        selectList[last] = false
    }
})

/* 选项表 */
const selectList = reactive({
    musicList: true,
    recommend: false,
    curated: false,
    favorite: false,
    playList: false,
    playHistory: false,
})
/* 上次选中 */
let last = 'musicList'
/* 选择函数 */
function check(itemName, path){
    navFlagUpdate()
    if(last !== undefined){
        selectList[last] = false
    }  
    last = itemName
    selectList[itemName] = true
    router.push(path)
}

//const uLang = ref('zh_CN')
const textList = reactive({
    zh_CN: {
        music_box: '基米音乐盒',
        music_list: '音乐列表',
        recommend: '为我推荐',
        curated: '精选音乐',
        playlist: '我的歌单',
        favorite: '我的收藏',
        play_history: '播放记录', 
    },
    zh_HK: {
        music_box: '基米音樂盒',
        music_list: '音樂列表', 
        recommend: '為我推薦',
        curated: '精選音樂',
        playlist: '我的歌單',
        favorite: '我的收藏',
        play_history: '播放記錄', 
    },
    en: {
        music_box: 'JM Music',
        music_list: 'Music List', 
        recommend: 'Recommended',
        curated: 'Curated Music',
        playlist: 'My Playlist',
        favorite: 'My Favorites',
        play_history: 'Play History', 
    },
});




</script>

<style scoped>
@import url("./nav-css.css");
.left-navigation{
    position: absolute;
    width: var(--left-nav-width);
    height: 100%;
    left: 0;
    top: 0;
}
.left-header{
    position: relative;
    width: 100%;
    height: var(--top-nav--height);
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    /* 拖动设置 */
    -webkit-app-region: drag;
}
.left-selector{
    position: relative;
    height: auto;
    width: 100%;
    box-sizing: border-box;
    padding: 20px 15px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}

.item-hr{
    position: relative;
    width: 80%;
    left: 10%;
}

/* 子项设置 */
.left-item{
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 15px;
    gap: 2px;
    font-size: 0.8rem;
    height: 35px;
    width: 100%;
    box-sizing: border-box;
    white-space: nowrap;
    border-radius: 8px;
}
.left-item:hover{
    background-color: rgba(135, 135, 138, 0.3);
}
.left-item.checked{
    background-color: rgb(121, 125, 248);
    color: aliceblue;
}
.left-item.checked .img-box{
    filter: brightness(1.8);
}

.img-box{
    position: relative;
    height: 100%;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* icon设置 */
#item-icon-music-list{
    height: 90%;
    transform: translateY(10%);
}
#item-icon-music{
    height: 55%;
}
#item-icon-send{
    height: 105%;
}
#item-icon-favorite{
    height: 105%;
}
#item-icon-history{
    height: 100%;
}
#item-icon-play-list{
    height: 105%;
}


</style>