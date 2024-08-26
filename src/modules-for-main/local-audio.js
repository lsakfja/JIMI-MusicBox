import { ipcMain, dialog } from 'electron';
const fs = require('fs')


export const openLocalFile = ()=>{
    ipcMain.on('open-local-file', async (e)=>{

        const result = await dialog.showOpenDialog({
            title: 'Select your music',
            defaultPath: require('os').homedir(), // 默认路径为用户的主目录
            buttonLabel: 'Select File',
            filters: [
                { name: 'Audio Files', extensions: ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'] }
            ],
            properties: ['openFile']
        });
    
        if (!result.canceled && result.filePaths.length > 0) {
            console.log('Selected folder:', result.filePaths[0]);
            e.sender.send('send-local-music-path', result.filePaths[0])
            return
        } else {
            console.log('No folder selected or dialog was canceled');
            e.sender.send('send-local-music-path', undefined)
            return null;
        }

    })
}