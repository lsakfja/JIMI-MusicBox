import { defineStore } from "pinia";
import { reactive, ref } from "vue";


export const useColorMode = defineStore('use-c-mode', ()=>{

    /* 
        ui模式列表  
        1.默认
        2.点雅黑
        3.经典红
    */
    const uiModeList = reactive([
        {
            name: 'c-mode-default',
            index: 0,
            isVip: false,
        },
        {
            name: 'c-mode-elegant-black',
            index: 1,
            isVip: false,
        },
        {
            name: 'c-mode-classi-red',
            index: 2,
            isVip: false,
        },
        {
            name: 'c-mode-fresh-green',
            index: 3,
            isVip: false,
        },
    ])

    const iconList = reactive([

    ])

    /* 当前选中(默认为经典模式) */
    const nowTarget = ref(uiModeList[0])

    function updateMode(uIndex){
        /* 修改当前选中值 */
        //console.log("ui模式切换,编号:", uIndex);
        nowTarget.value = uiModeList[uIndex]
    }


    return {
        uiModeList, nowTarget,
        updateMode
    }

})