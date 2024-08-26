//获取项目文件夹中所有的音乐文件
const fs = require('fs');
const path = require('path');
import { ipcMain } from 'electron';

export const getPackagesAudio = () => {
    console.log("audio in main process");
    console.log("resource path is:", process.resourcesPath);
    console.log("process.cwd() path is:", process.cwd());
    
    //从这里获取所有打包音频
    let audioDir;
    if (process.env.NODE_ENV === 'development') {
        audioDir = path.join(process.cwd(), 'src/resources/song-pack/audio');
    } else {
        console.log("__dirname is:", __dirname);

        /* 生产模式 */
        const distPath = path.join(process.cwd(), 'dist', 'win-unpacked');

        /* 打包模式 */
        //const distPath = path.join(process.cwd());

        audioDir = path.join(distPath, 'resources/resources/song-pack/audio');
        ipcMain.on('log-audio-path', (e)=>{
            e.sender.send('return-audio-path', audioDir);
        })
    }
    console.log("audioDir is :", audioDir);
    
    try {
        // 读取目录中的文件
        const files = fs.readdirSync(audioDir);
        
        // 过滤出音频文件，假设支持 .mp3 和 .wav
        const audioFiles = files.filter(file => ['.mp3', '.wav'].includes(path.extname(file)));
        
        // 返回音频文件的完整路径数组
        let audioMap = audioFiles.map(file => path.join(audioDir, file));
        //console.log(audioMap);
        ipcMain.on('get-packages-audio', (e)=>{
            console.log("audio-player will send audioMap");
            e.sender.send('send-audio-map', audioMap);
        })

    } catch (err) {
        console.error("Error reading audio directory:", err);
        return;
    }

}
