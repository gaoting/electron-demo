const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  cancenBluetoothRequest:callback => ipcRenderer.send('cancel-bluetooth-request', callback),
  bluetoothPairingRequest: (callback) => ipcRenderer.on('bluetooth-pairing-request', callback),
  bluetoothPairingResponse: (response) => ipcRenderer.send('bluetooth-pairing-response', response)
})