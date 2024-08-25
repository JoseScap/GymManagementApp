import { app, BrowserWindow, screen, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let mainWindow: BrowserWindow | null
let secondWindow: BrowserWindow | null

function createWindows() {
  const displays = screen.getAllDisplays()

  // Crear la primera ventana en la primera pantalla
  mainWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'gym_management.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
    x: displays[0].bounds.x,
    y: displays[0].bounds.y,
  })

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  // Crear la segunda ventana en la segunda pantalla (si está disponible)
  if (displays.length > 1) {
    secondWindow = new BrowserWindow({
      icon: path.join(process.env.VITE_PUBLIC, 'gym_management.ico'),
      webPreferences: {
        preload: path.join(__dirname, 'preload.mjs'),
      },
      x: displays[1].bounds.x,
      y: displays[1].bounds.y,
    })

    secondWindow.webContents.on('did-finish-load', () => {
      secondWindow?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    if (VITE_DEV_SERVER_URL) {
      secondWindow.loadURL(`${VITE_DEV_SERVER_URL}/watchman.html`)
    } else {
      secondWindow.loadFile(path.join(RENDERER_DIST, 'watchman.html'))
    }
  }

  // Escuchar el evento para intercambiar pantallas
  ipcMain.on('switch-screens', () => {
    if (mainWindow && secondWindow) {
      const mainWindowBounds = mainWindow.getBounds();
      const secondWindowBounds = secondWindow.getBounds();

      // Intercambiar las posiciones de las ventanas
      mainWindow.setBounds(secondWindowBounds);
      secondWindow.setBounds(mainWindowBounds);
    }
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    mainWindow = null
    secondWindow = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindows()
  }
})

app.whenReady().then(createWindows)
