<template>
    <div class="local-setting">
        <span class="main-title">{{ textList[uLang].page_title }}</span>
        <div class="setting-inner">
            <div class="setting-list setting-same">
                <span class="setting-list-span">{{ textList[uLang].account_settings }}</span>
                <span class="setting-list-span">{{ textList[uLang].lang_setting }}</span>
                
            </div>
            <hr>
            <div class="account-setting setting-same">
                <span class="setting-span-title">{{ textList[uLang].account_settings }}</span>
                <div class="account-area area-box">

                </div>
            </div>
            <div class="user-lang setting-same">
                <span class="setting-span-title">{{ textList[uLang].lang_setting }}</span>
                <div class="lang-area area-box">
                    <select name="lang-select" id="lang-select" v-model="langV">
                        <option
                            v-for="(item, index) in langList"
                            :key="index"
                            :value="item"
                            :label="langView[item]"
                        >{{ langView[item] }}</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, reactive, ref, toRefs, watch } from "vue";
import { useLangStore } from '../../../store/useLangStore'
const useLnag = useLangStore()
const { langList, langView } = toRefs(useLnag)

/* 注入app中标识符 */
const uLang = inject('uLang')

const langV = ref(uLang.value)
watch(langV, (newValue, oldValue)=>{
    //console.log("语言切换, 由:", oldValue, "切换至:", newValue);
    useLnag.langReSet(newValue)
})
const textList = reactive({
    zh_CN: {
        page_title: '设置',
        lang_setting: '语言',
        account_settings: '账户',
    },
    zh_HK: {
        page_title: '設定',
        lang_setting: '語言',
        account_settings: '賬戶',
    },
    en: {
        page_title: 'Setting',
        lang_setting: 'Language',
        account_settings: 'Account',
    },
});

</script>

<style>
.local-setting{
    position: relative;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    font-size: 0.9rem;
    --title-height: 32px;
}
.main-title{
    font-size: 1.2rem;
    display: inline-block;
    height: var(--title-height);
    font-weight: bold;
}
.setting-inner{
    position: relative;
    height: calc(100% - var(--title-height));
    width: 100%;
    box-sizing: border-box;
    padding-top: 15px;
    overflow: auto;
}
.setting-list-span{
    position: relative;
    display: inline;
    height: 100%;
    font-weight: bold;
    margin-right: 15px;
}
.setting-span-title{
    position: relative;
    font-weight: bold;
    font-size: 0.9rem;


}
.setting-same{
    position: relative;
    width: 100%;
    margin-top: 5px;
}
.setting-list{
    height: 33px;
}

/* 框体设置 */
.account-setting{
    height: 100px;
}
.user-lang{
    height: 40px;
}

/* 选择框 */
#lang-select{
    position: relative;
    height: 25px;
    width: 180px;
}

/* 内部设置区域 */
.area-box{
    position: absolute;
    --area-left: 130px;
    left: var(--area-left);
    top: 0;
    height: 100%;
    width: calc(100% - var(--area-left));
}


</style>