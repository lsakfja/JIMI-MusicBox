import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { Howl } from "howler";

export const useAudioMsg = defineStore('use-audio-msg', ()=>{

    /* 打包音频总数量 */
    const audioCounts = ref(0)

    /* 打包音频地址 */
    const packAudioList = reactive([])

    /* 选中的音频文件 */
    const audioAimming = reactive({
        name: 'NULL',
        path: 'NULL',
    })

    /* 当前的歌单 */
    const audiosList = reactive([])

    /* 音频的播放情况 */
    const isPlaying = ref(false)
    const playingIndex = ref()
    const playingMsg = reactive({
        /* 总时长 */
        totalLength: 0,
        /* 当前进度 */
        cruentLength: 0,
        /* 进度百分比 */
        currentRaito: 0,
        /* 当前音量 */
        cruentVolume: 0,
    })

    /* store内部函数,更新播放信息 */
    function updatePlayingMsg() {
        //console.log(playingMsg.cruentLength);
        if(isPlaying.value){
            playingMsg.cruentLength = player.seek();
            playingMsg.currentRaito = playingMsg.cruentLength / playingMsg.totalLength
            playingMsg.cruentVolume = player.volume();
            animationFrameId = requestAnimationFrame(updatePlayingMsg);
            //console.log(playingMsg.currentRaito);
        }else{
            return
        }
    }

    /* store内部函数,结束一个音频的播放后移除它 */
    function audioOnEnd(){
        //audiosList.shift()
        console.log("当前音乐结束");
        /* 若歌单还有音乐那么继续播放 */
        //if(audiosList.length > 0){
        //    listAndPlay(0)
        //}
        if(audiosList[playingIndex.value + 1]){
            listAndPlay(playingIndex.value + 1)
        }else{
            listAndPlay(0) 
        }
    }

    /* 设置音频数量 */
    function countAudios(count){
        audioCounts.value = count
    }

    /* 设置音频地址 */
    function audioPathSetter(paths){
        packAudioList.length = 0
        for(let i of paths){
            //console.log(i);
            packAudioList.push(i)
        }   
        //console.log(packAudioList);
    }

    /* 音频选择函数 */
    function aduioSelector(index, name){
        //console.log('选中: ', packAudioList[index]);
        audioAimming.path = packAudioList[index]
        audioAimming.name = name
        
    }

    /* 音频推入歌单 */
    function audioListPusher(index, name){
        //console.log(index, name);
        //console.log("路径:", packAudioList[index]);
        audiosList.unshift({
            name: name,
            path: packAudioList[index]
        })
        
    }

    /* 从音乐列表中选中某个音频, 并且播放 */
    let player
    let animationFrameId;
    function selectAndPlay(index, name){
        console.log("装载音频");
        isPlaying.value = true
        aduioSelector(index, name)
        audioListPusher(index, name)
        if(player === undefined){
            player = new Howl({
                src: packAudioList[index],
                onload: () => {
                    playingMsg.totalLength = player.duration();
                },
                onplay: () => {
                    updatePlayingMsg();
                },
                onend: () => {
                    cancelAnimationFrame(animationFrameId);
                    isPlaying.value = false;
                    playingMsg.cruentLength = 0;
                    audioOnEnd()
                }
            })
        }else{
            player.pause()
            player = new Howl({
                src: packAudioList[index],
                onload: () => {
                    playingMsg.totalLength = player.duration();
                },
                onplay: () => {
                    updatePlayingMsg();
                },
                onend: () => {
                    cancelAnimationFrame(animationFrameId);
                    isPlaying.value = false;
                    playingMsg.cruentLength = 0;
                    audioOnEnd()
                }
            })
        }  
        /* 播放后设置 */  
        player.play()
        playingIndex.value = 0
    }

    /* 从歌单音乐中选中某个音频, 并且播放 */
    function listAndPlay(index){
        player.pause()
        audioAimming.name = audiosList[index].name
        audioAimming.path = audiosList[index].path

        player = new Howl({
            src: audiosList[index].path,
            onload: () => {
                playingMsg.totalLength = player.duration();
            },
            onplay: () => {
                updatePlayingMsg();
            },
            onend: () => {
                cancelAnimationFrame(animationFrameId);
                isPlaying.value = false;
                playingMsg.cruentLength = 0;
                audioOnEnd()
            }
        })
        isPlaying.value = true
        /* 在播放后设置 */
        player.play()
        playingIndex.value = index
        //let temp = audiosList[index]
        //audiosList[index] = audiosList[0]
        //audiosList[0] = temp
    }

    /* 控件函数,获取上一首或下一首音频并播放 */
    function checkNextAndPre(target){
        if(audiosList.length <= 1){
            return 
        }

        if(target === 'next'){
            /* 已经在播放最后一首音频,取消行为 */
            if(audiosList[playingIndex.value + 1] === undefined){
                return
            }else{
                /* 还有下一首音频,播放下一首即可 */
                listAndPlay(playingIndex.value + 1)
            }
        }else if(target === 'pre'){
            /* 已经在播放第一个音频,取消行为 */
            if(playingIndex.value === 0){
                return
            }else{
                /* 还有上一个音频,播放下一个即可 */
                listAndPlay(playingIndex.value - 1)
            }
        }
    }

    /* 重置当前音频播放状态 */
    function playReset(){
        if(player === undefined){
            return 
        }
        if(isPlaying.value){
            player.pause()
        }else{
            player.play()
        }
        isPlaying.value = !isPlaying.value
    }

    /* 清除播放列表, 终止所有音频播放行为 */
    function sweapPlayer(){
        if(audiosList.length === 0){
            return 
        }
        player.stop()
        isPlaying.value = false
        player = undefined
        audiosList.length = 0
        playingMsg.cruentLength = 0
        playingMsg.totalLength = 0
        playingMsg.currentRaito = 0
        audioAimming.name = 'NULL'
        audioAimming.path = 'NULL'
        cancelAnimationFrame(animationFrameId)
    }

    return{
        audioCounts, packAudioList, audioAimming, audiosList, isPlaying, playingMsg,
        playingIndex, 

        countAudios, audioPathSetter, aduioSelector, audioListPusher, 
        selectAndPlay, playReset, listAndPlay, sweapPlayer, checkNextAndPre
    }
})