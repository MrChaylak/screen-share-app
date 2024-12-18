const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getSources: async () => {
    return await ipcRenderer.invoke('get-sources');
  }
});
