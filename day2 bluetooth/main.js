const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('node:path')

let bluetoothPinCallback
let selectBluetoothCallback

function createWindow() {
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })

    mainWindow.webContents.on('select-bluetooth-device', (event, deviceList,callback) => {
      event.preventDefault()
      selectBluetoothCallback = callback 
      const result = deviceList.find(device => {
        return device.deviceName === 'test'
      })
      if(result) {
        callback(result.deviceId)
      }else {

      }
    })


    ipcMain.on('cancel-bluetooth-request',event => {
      selectBluetoothCallback(response)
    })

    ipcMain.on('bluetooth-pairing-response',(event,response) => {
      bluetoothPinCallback(response)
    })

    mainWindow.webContents.session.setBluetoothPairingHandler((details, callback) => {
      bluetoothPinCallback = callback 
      mainWindow.webContents.send('bluetooth-pairing-request', details)
    })
    mainWindow.loadFile('index.html')
}


app.whenReady().then(()=>{
  createWindow()

  app.on('activate', function () {
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed',function(){
  if(process.platform !== 'darwin') app.quit()
})