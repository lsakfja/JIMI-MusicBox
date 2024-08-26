import { ipcMain } from 'electron';

const https = require('https');
const fs = require('fs');
const path = require('path');

export function ossDownLoad() {
  ipcMain.on('download-file', (e) => {
    const url = 'https://jm-music-storage.oss-cn-hangzhou.aliyuncs.com/At%20The%20Edge.mp3?Expires=1720717690&OSSAccessKeyId=TMP.3KheTdjNrPY62yLXVCcJuqn6qdodLBzTEWGLybBrQJbWyQw3GsgWRTNxVD5X2wrwT3sp5GjRj1SxUi5iRspvFVdKXCWdxe&Signature=kGFXU2g3XHoZuWLf266Ij80MWqA%3D';

    const outputPath = 'C:\\Users\\WSY\\Desktop\\mp3\\HJM\\At The Edge HJM.mp3'; // 目标文件路径

    const file = fs.createWriteStream(outputPath);

    https.get(url, (response) => {
      response.pipe(file);

      const totalLength = parseInt(response.headers['content-length'], 10);
      let downloadedLength = 0;
      response.on('data', (chunk) => {
        downloadedLength += chunk.length;
        const progress = (downloadedLength / totalLength) * 100;
        e.sender.send('download-progress', { progress });
        e.sender.send('download-data', chunk); // 发送已下载的数据块到渲染进程
      });

      file.on('finish', () => {
        file.close();
        // 这里可以发送下载完成的事件给渲染进程
        // event.sender.send('download-completed', outputPath);
      });
    }).on('error', (err) => {
      // 这里可以发送下载失败的事件给渲染进程
      // event.sender.send('download-failed', err.message);
    });
  });
}
