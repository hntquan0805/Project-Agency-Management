const { app, BrowserWindow, ipcMain, screen} = require('electron');
const { signUpUser } = require('./controllers/userController');
const { addAgency } = require('./controllers/agencyController');
const { connect } = require('./config/database');
const { searchAgencies } = require('./controllers/searchAgencyController');
const { updateSettings } = require('./controllers/settingAgencyRuleController');
const { getProductsByAgency } = require('./controllers/getProductsByAgency');
const { updateAgencyTypeSettings, getAgencyTypesFromDB } = require('./controllers/settingAgencyTypeController');
const { searchDeliveryNotesByDate, countNoteByAgency } = require('./controllers/monthlyReportController');
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

    mainWindow.loadFile(path.join(__dirname, 'views/monthlyReport.html'));
});

ipcMain.handle('get-products', async (event, type) => {
    try {
        return await getProductsByAgency(type);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fectching data!' };
    }

});

ipcMain.handle('search', async (event, criteria) => {
    try {
        return await searchAgencies(criteria);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fectching data!' };
    }
});

ipcMain.handle('search-by-month', async (event, criteria) => {
    try {
        return await searchDeliveryNotesByDate(criteria);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fectching data!' };
    }
});

ipcMain.handle('count-agency', async (event, criteria) => {
    try {
        return await countNoteByAgency(criteria);
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

ipcMain.handle('agency-rule-1', async (event, updateData) => {
    try {
        const result = await updateSettings(updateData);

        return result;
    } catch (error) {
        console.error('Error in ipcMain handle updateSettings:', error);
        return { success: false, message: 'Error in ipcMain handle updateSettings.' };
    }
});

ipcMain.handle('agency-type-1', async (event, updateData) => {
    try {
        const result = await updateAgencyTypeSettings(updateData);
        return result;
    } catch (error) {
        console.error('Error in ipcMain handle updateSettings:', error);
        return { success: false, message: 'Error in ipcMain handle updateSettings.' };
    }
});

ipcMain.handle('get-agency-types', async () => {
    try {
        const agencyTypes = await getAgencyTypesFromDB();
        console.log(agencyTypes);
        return agencyTypes;
    } catch (error) {
        console.error('Error fetching agency types:', error);
        return [];
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
