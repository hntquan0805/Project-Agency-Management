const { app, BrowserWindow, ipcMain, screen} = require('electron');
const { signUpUser } = require('./controllers/userController');
const { addAgency } = require('./controllers/agencyController');
const { connect } = require('./config/database');
const { searchAgencies } = require('./controllers/searchAgencyController');
const path = require('path');

connect();

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

    mainWindow.loadFile(path.join(__dirname, 'views/searchAgent.html'));
});

ipcMain.handle('search', async (event, criteria) => {
    try {
        return await searchAgencies(criteria);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fectching data!' };
    }
});

ipcMain.handle('add-agency', async (event, agencyData) => {
    try {
        return await addAgency({ body: agencyData });
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error adding data!' };
    }
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
