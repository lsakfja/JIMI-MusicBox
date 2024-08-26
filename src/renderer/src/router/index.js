import { createWebHistory, createRouter } from "vue-router";

/* 一级路由 */
import musicList from '../components/page/route-level-1/music-list.vue'
import myRecommend from '../components/page/route-level-1/my-recommend.vue'
import curatedMusic from '../components/page/route-level-1/curated-music.vue'
import themeToggle from '../components/page/route-level-1/theme-toggle.vue'
import localSetting from '../components/page/route-level-1/local-setting.vue'
import myFavorite from "../components/page/route-level-1/favorite.vue";
import playList from '../components/page/route-level-1/play-list.vue'
import playHistory from '../components/page/route-level-1/play-history.vue'


const routes = [
    {
        path: '/',
        redirect: '/music-list',
    },
    {
        path: '/music-list',
        name: 'music-list',
        component: musicList,
    },
    {
        path: '/my-recommend',
        name: 'my-recommend',
        component: myRecommend,
    },
    {
        path: '/curated-music',
        name: 'curated-music',
        component: curatedMusic,
    },
    {
        path: '/theme-toggle',
        name: 'theme-toggle',
        component: themeToggle,
    },
    {
        path: '/local-setting',
        name: 'local-setting',
        component: localSetting,
    },
    {
        path: '/my-favorite',
        name: 'my-favorite',
        component: myFavorite,
    },
    {
        path: '/play-list',
        name: 'play-list',
        component: playList,
    },
    {
        path: '/play-history',
        name: 'play-history',
        component: playHistory,
    },
]

const router = createRouter({
    mode: "hash",
    history: createWebHistory(),
    routes: routes
})

export default router