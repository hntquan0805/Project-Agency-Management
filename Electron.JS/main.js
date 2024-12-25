const { app, BrowserWindow, ipcMain, screen} = require('electron');
const { signUpUser } = require('./controllers/userController');
const { addAgency } = require('./controllers/agencyController');
const { connect } = require('./config/database');
const { searchAgencies } = require('./controllers/searchAgencyController');
const { updateSettings } = require('./controllers/settingAgencyRuleController');
<<<<<<< HEAD
const { getProductsByAgency } = require('./controllers/getProductsByAgency');
=======
const { updateAgencyTypeSettings, getAgencyTypesFromDB } = require('./controllers/settingAgencyTypeController');
>>>>>>> 98d48394d30090876ce3daba2db710f8de0e45fb
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

<<<<<<< HEAD

    mainWindow.loadFile(path.join(__dirname, 'views/setting.html'));
});

ipcMain.handle('get-products', async (event, type) => {
    try {
        return await getProductsByAgency(type);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fectching data!' };
    }
=======
    mainWindow.loadFile(path.join(__dirname, 'views/addAgent.html'));
>>>>>>> 98d48394d30090876ce3daba2db710f8de0e45fb
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
<<<<<<< HEAD
=======

>>>>>>> 98d48394d30090876ce3daba2db710f8de0e45fb
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
        // Giả sử bạn có một hàm updateSettings trong backend để xử lý cập nhật dữ liệu.
        const result = await updateAgencyTypeSettings(updateData); // Bạn sẽ thực hiện hành động cần thiết với `updateData`

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
