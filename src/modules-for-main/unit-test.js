import { ipcMain, dialog } from 'electron';

export const openFolder = ()=>{
    console.log("UNIT TEST START")
    ipcMain.on('test-open-folder', async (e)=>{
        console.log("OPENING FOLODER");

        const result = await dialog.showOpenDialog({
            title: 'Select a Folder',
            defaultPath: require('os').homedir(), // 默认路径为用户的主目录
            buttonLabel: 'Select Folder',
            filters: [
                { name: 'Audio Files', extensions: ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'] }
            ],
            properties: ['openFile', 'createDirectory']
        });
    
        if (!result.canceled && result.filePaths.length > 0) {
            console.log('Selected folder:', result.filePaths[0]);
            return result.filePaths[0];
        } else {
            console.log('No folder selected or dialog was canceled');
            return null;
        }

    })
}






