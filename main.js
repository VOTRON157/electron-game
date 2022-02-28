const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
  })
  win.loadFile('pages/menu.html')
  win.maximize()
}
app.whenReady().then(() => {
  createWindow()
});