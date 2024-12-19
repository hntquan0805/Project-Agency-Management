const { app, BrowserWindow, ipcMain, screen} = require('electron');
const { signUpUser } = require('./controllers/userController');
const { searchAgencies } = require('./controllers/searchAgencyController');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: true,
        },
    });

    mainWindow.loadFile(path.join(__dirname, 'views/signup.html'));
});

ipcMain.handle('search', async (event, criteria) => {
    return await searchAgencies(criteria);
});

ipcMain.handle('sign-up', async (event, { username, password }) => {
    return await signUpUser(username, password);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
