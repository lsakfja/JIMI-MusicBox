import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useLangStore = defineStore('use-lang', ()=>{

    const langView = reactive({
        'zh_CN': '简体中文',
        'zh_HK': '繁體中文',
        'en': 'English',
    })

    const langList = reactive([
        'zh_CN', 'zh_HK', 'en',
    ]) 

    const uLang = ref('zh_CN')

    function langReSet(other_lang){
        uLang.value = other_lang
    }

    return {
        langList, uLang, langView,
        langReSet,
    }
})
