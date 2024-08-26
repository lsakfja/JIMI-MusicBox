import { ipcMain, BrowserWindow } from 'electron';

export function mainListener(mainWindow){
    //console.log("main process is listening");
    /* 关闭整个项目 */
    ipcMain.on('do-close-all-window', (e)=>{
      //console.log("target-> do-close-process");
      const windows = BrowserWindow.getAllWindows()
      windows.forEach(item=>{
        item.close()
      })
    })
    /* 最小化主窗口 */
    ipcMain.on('do-min-size-main-window', (e)=>{
      //console.log("target-> do-min-size-main-window");
      mainWindow.minimize()
    })
    /* 最大化主窗口 */
    ipcMain.on('do-max-size-main-window', (e)=>{
      //console.log("target-> do-max-size-main-window");
      mainWindow.maximize()
    })
    /* 调整主窗口为合适大小 */
    ipcMain.on('do-zoom-main-window', (e, size)=>{
      //console.log("target-> do-zoom-main-window AND value->", size);
      mainWindow.unmaximize();
      mainWindow.setSize(size.x, size.y)
    })

    /* 禁止主窗口的纵向拉伸 */
    mainWindow.on('will-resize', (event, newBounds)=>{
      // 禁止纵向拉伸
      event.preventDefault();
      // 只允许调整宽度，不改变高度
      mainWindow.setBounds({
          x: newBounds.x,
          y: newBounds.y,
          width: newBounds.width,
          height: mainWindow.getBounds().height
      });
    })

}
