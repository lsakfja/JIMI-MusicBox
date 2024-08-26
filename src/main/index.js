import { app, shell, BrowserWindow, protocol, Menu, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

const fs = require('fs')
const path = require('path')
const url = require('url')
const player = require('play-sound')({});



/* 功能导入 */
import { ossDownLoad } from '../modules-for-main/file-downloader'
import { mainListener } from '../modules-for-main/window-sizer'
import { ossGetUrl } from '../modules-for-main/audio-request'
import { openLocalFile } from '../modules-for-main/local-audio'
import { getPackagesAudio } from '../modules-for-main/audio-player'
import { urlGetter } from '../modules-for-main/axios-runner'

/* 测试模块 */
import { openFolder } from '../modules-for-main/unit-test'

//启动控制台
const NODE_ENV = process.env.NODE_ENV

/* 注册协议 */
//protocol.registerSchemesAsPrivileged([
//  { scheme: 'customfile', privileges: { secure: true, standard: true, bypassCSP: true } }
//])

function createWindow() {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1074,
    height: 756,
    minWidth: 1074,
    minHeight: 756,
    frame: true,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle:'hidden',
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      //解锁上下文隔离
      contextIsolation:false,
      //警用web安全，但不推荐
      //webSecurity: false,
    }
  })

  /* 控制台 */
  if(NODE_ENV == 'development'){
    mainWindow.webContents.openDevTools()
  }

  

  /* 启动功能函数 */
  ossDownLoad()
  mainListener(mainWindow)
  ossGetUrl()
  openLocalFile()
  getPackagesAudio()
  urlGetter()

  /* 启动单元测试 */
  openFolder()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    console.log("run in url");
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    console.log("run in path");
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

 
 /* const filePath = path.resolve('C:/Users/WSY/Desktop/mp3/TEST.mp3');
 player.play(filePath, (err) => {
   if (err) throw err;
 }); */

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  /* 本地文件安全处理 */
  //protocol.handle('customfile', (request) => {  
  //  console.log("request.url:", request.url);
  //  const url = new URL(request.url);
  //  const filePath = path.resolve(decodeURIComponent(url.pathname));
  //  console.log("filePath is:", filePath);
  //  try {
  //    // Read the file content
  //    const data = fs.readFileSync(filePath);
  //    return {
  //      data,
  //      mimeType: 'audio/mpeg', // Adjust MIME type based on file type
  //    };
  //  } catch (error) {
  //    console.error('Failed to read file:', error);
  //    return { data: Buffer.from('') };
  //  }
  //})

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    console.log("process is end now");
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
