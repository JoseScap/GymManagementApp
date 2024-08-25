import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // ***** HERE's a change: Added a method to handle 'once' event
  once(...args: Parameters<typeof ipcRenderer.once>) {
    const [channel, listener] = args;
    return ipcRenderer.once(channel, (event, ...args) => listener(event, ...args));
  },

  // ***** HERE's a change: Expose the ipcRenderer object directly for custom usages
  ipcRenderer
  // You can expose other APIs you need here.
  // ...
})

// ***** HERE's a change: Expose the entire ipcRenderer object in the global window object
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel: string, data: any) => ipcRenderer.send(channel, data),
    on: (channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.on(channel, listener);
    },
    once: (channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
      ipcRenderer.once(channel, listener);
    }
  }
});
