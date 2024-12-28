const { app, BrowserWindow, ipcMain, screen} = require('electron');
const { connect } = require('./config/database');
const path = require('path');

const { addAgency } = require('./controllers/agencyController');
const SearchAgencies = require('./controllers/searchAgencyController');
const { updateSettings } = require('./controllers/settingAgencyRuleController');
const { getProductsByAgency, getProductsByCode } = require('./controllers/getProductsByAgencyController');
const { updateAgencyTypeSettings, getAgencyTypesFromDB } = require('./controllers/settingAgencyTypeController');
const EditProductsByAgency = require('./controllers/editProductsByAgencyController');
const UserController = require('./controllers/loginController');
const AddDeliveryNote = require('./controllers/addDeliveryNoteController');

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

    mainWindow.loadFile(path.join(__dirname, 'views/login.html'));
});

ipcMain.handle('find-all-products', async (event, { name, type }) => {
    try {
        return await AddDeliveryNote.findAllProducts(name, type);
    } catch (error) {
        console.error('Error in ipcMain handle findAllProducts:', error);
        return { success: false, message: 'Error fetching data!' };
    }
});

ipcMain.handle('login', async (event, { name, password }) => {
    return await UserController.login(name, password);
});

ipcMain.handle('get-products-code', async (event, { productCode, unit, type }) => {
    try {
        return await getProductsByCode(productCode, unit, type);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fetching data!' };
    }
});

ipcMain.handle('update-product', async (event, { productCode, unit, type, price }) => {
    try {
        return await EditProductsByAgency.updateProductByAgency(productCode, unit, type, price);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error deleting data!' };
    }
});

ipcMain.handle('delete-product', async (event, { productCode, unit, type}) => {
    try {
        return await EditProductsByAgency.deleteProductByAgency(productCode, unit, type);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error deleting data!' };
    }
});

ipcMain.handle('get-products', async (event, type) => {
    try {
        const products = await getProductsByAgency(type);
        return products;
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fectching data!' };
    }

});

ipcMain.handle('search', async (event, criteria) => {
    try {
        return await SearchAgencies.searchAgencies(criteria);
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
