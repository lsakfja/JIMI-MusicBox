import { ipcMain } from 'electron';

export function ossGetUrl() {
  ipcMain.on('request-audio-url', (e) => {
    const audioUrl = 'https://web-wsyframework.oss-cn-beijing.aliyuncs.com/music-pack/I%20got%20smoke.mp3';
    e.sender.send('response-audio-url', audioUrl);
  });
}


