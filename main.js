// Modules to control application life and create native browser window
const {app, BrowserWindow, Tray, Menu} = require('electron')
const path = require('path')
const nativeImage = require('electron').nativeImage

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
  //mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
  
  let trayContextMenu = Menu.buildFromTemplate([
    {
      label: 'Test',
      icon: 'reload.png',
      click () {
        console.log ("Test clicked")
      }
    }
  ])
  let img = nativeImage.createFromPath(path.join(__dirname, 'reload.png'))
  let appTray = new Tray(img)

  appTray.on('right-click', () => {
    appTray.popUpContextMenu(trayContextMenu)
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})