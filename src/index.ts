import { app, BrowserWindow } from 'electron';
import http from 'http';
import express from 'express';

const expressApp = express();
const httpServer = http.createServer(expressApp); 

expressApp.use(express.static('./view/build'));

function createWindow() {
  const window = new BrowserWindow({
    title: 'Test',
  });

  window.loadURL('http://localhost/');
}

function readyApp() {
  return new Promise<void>(resolve => app.on('ready', () => resolve(undefined)));
}

function readyServer() {
  return new Promise<void>(resolve => httpServer.listen(80, () => resolve(undefined)));
}

async function main() {
  await Promise.all([readyApp(), readyServer()]);

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit();
});

main().catch(console.error);