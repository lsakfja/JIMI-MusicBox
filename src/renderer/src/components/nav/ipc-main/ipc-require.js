const { ipcMain } = require('electron')

export function testIPC(){
    ipcRenderer.send('asynchronous-message', 'ping');

    ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg); // 打印 "pong"
    });

    console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // 打印 "pong"
}