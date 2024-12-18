const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
import { isDev } from './util.js';

type test = string;

function createWindow () {
  const win = new BrowserWindow({
    width: 1040,
    height: 780,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  /* if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:3000');
  } else {
    win.loadFile('dist-vue/index.html');
  } */
  if (isDev()) {
    win.loadURL('http://localhost:3000');
  } else {
    win.loadFile('dist-vue/index.html');
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})