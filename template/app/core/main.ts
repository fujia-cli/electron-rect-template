import path from 'path';
import { app, BrowserWindow, Menu } from 'electron';

import customMenu from './customMenu';

const isDev = (() => process.env.NODE_ENV === 'development')();

// Disable hardware acceleration which easy to lead to host interface jamming under Ubuntu System.
app.disableHardwareAcceleration();

function createWin() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true, // inject node module
      contextIsolation: false,
    },
  });

  if (isDev) {
    win.loadURL(`http://0.0.0.0:7001`);
  } else {
    win.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
  }
}

app.on('ready', () => {
  const menu = Menu.buildFromTemplate(customMenu);
  Menu.setApplicationMenu(menu);
});

app.whenReady().then(() => {
  createWin();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWin();
    }
  });
});
