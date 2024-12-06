const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { createUser } = require('./controllers/userController');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js'),
            contextIsolation: false,
            enableRemoteModule: true,
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile('views/signup.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

ipcMain.on('user:signup', async (event, userData) => {
    try {
        const response = await createUser(userData);
        event.reply('signup:response', response);
    } catch (error) {
        event.reply('signup:response', { success: false, error: error.message });
    }
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
