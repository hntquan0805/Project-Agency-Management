const { app, BrowserWindow, ipcMain, screen} = require('electron');
const { connect } = require('./config/database');
const path = require('path');

const _Agency = require('./agency/controllers/agencyController');
const { getAllAgencies } = require('./agency/controllers/loadAgencyController');
const SearchAgencies = require('./agency/controllers/searchAgencyController');
const { updateSettings } = require('./setting/controllers/settingAgencyRuleController');
const GetProductsByAgency = require('./setting/controllers/getProductsByAgencyController');
const settingAgencyTypeController = require('./setting/controllers/settingAgencyTypeController');
const monthlyReportController = require('./report/controllers/monthlyReportController');
const addReceivedNoteController = require('./report/controllers/addReceivedNote');
const EditProductsByAgency = require('./setting/controllers/editProductsByAgencyController');
const UserController = require('./login/controllers/loginController');
const AddDeliveryNote = require('./report/controllers/addDeliveryNoteController');
const saveFormData = require('./setting/controllers/addController');
const EditAgency = require('./agency/controllers/editAgencyController');

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

    mainWindow.loadFile(path.join(__dirname, './login/views/login.html'));
});

ipcMain.handle('create-delivery-note-detail', async (event, deliveryNoteDetailData) => {
    try {
        return await AddDeliveryNote.createDeliveryNoteDetail(deliveryNoteDetailData);
    } catch (error) {
        console.error('Error in ipcMain handle createDeliveryNoteDetail:', error);
        return { success: false, message: 'Error creating delivery note detail!' };
    }
});

ipcMain.handle('delete-agency', async (event, agencyCode) => {
    try {
        return await EditAgency.deleteAgency(agencyCode);
    } catch (error) {
        console.error('Error in ipcMain handle deleteAgency:', error);
        return { success: false, message: 'Error deleting agency!' };
    }
});

ipcMain.handle('create-delivery-note', async (event, deliveryNoteData) => {
    try {
        return await AddDeliveryNote.createDeliveryNote(deliveryNoteData);
    } catch (error) {
        console.error('Error in ipcMain handle createDeliveryNote:', error);
        return { success: false, message: 'Error creating delivery note!' };
    }
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
        return await GetProductsByAgency.getProductsByCode(productCode, unit, type);
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
        return await GetProductsByAgency.getProductsByAgency(type);
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

ipcMain.handle('search-by-month', async (event, criteria) => {
    try {
        return await monthlyReportController.searchDeliveryNotesByDate(criteria);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fectching data!' };
    }
});

ipcMain.handle('update-agency-data', async (event, criteria) => {
    try {
        console.log('vo main goi')
        return await EditAgency.updateAgency(criteria);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fectching data!' };
    }
});

ipcMain.handle('save-received-note', async (event, criteria) => {
    try {
        return await addReceivedNoteController.saveGoodsReceivedNote(criteria);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fectching data!' };
    }
});


ipcMain.handle('count-agency', async (event, criteria) => {
    try {
        return await monthlyReportController.countNoteByAgency(criteria);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fectching data!' };
    }
});

ipcMain.handle('cal-propor', async (event, criteria) => {
    try {
        return await monthlyReportController.calculateProportion(criteria);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fectching data!' };
    }
});

ipcMain.handle('debt-report', async (event, { month, year, table }) => {
    try {
        return await monthlyReportController.renderDebtTable(month, year, table);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fectching data!' };
    }
});

ipcMain.handle('save-debt-history', async (event, { month, year, table_debt }) => {
    try {
        await monthlyReportController.saveDebtHistory(month, year, table_debt);
        return { success: true };
    } catch (error) {
        console.error('Error saving debt history:', error);
        return { success: false, message: 'Error saving debt history!' };
    }
});

ipcMain.handle('get-max-product', async (event, currentType) => {
    try {
        return await AddDeliveryNote.getMaxProduct(currentType);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error adding data!' };
    }
});

ipcMain.handle('save-revenue-report', async (event, { month, year, reportData }) => {
    try {
        await monthlyReportController.saveRevenueReport(month, year, reportData);
        return { success: true };
    } catch (error) {
        console.error('Error saving report to database:', error);
        return { success: false, message: error.message };
    }
});

ipcMain.handle('add-agency', async (event, agencyData) => {
    try {
        return await _Agency.addAgency({ body: agencyData });
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error adding data!' };
    }
});

ipcMain.handle('get-agency-code', async (event, agency_name) => {
    try {
        return await _Agency.get_agency_code(agency_name);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error adding data!' };
    }
});

ipcMain.handle('get-agency-data', async () => {
    try {
        return await getAllAgencies();
    } catch (error) {
      console.error('Error fetching agency data:', error);
      throw new Error('Failed to fetch data');
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
        const result = await settingAgencyTypeController.updateAgencyTypeSettings(updateData);
        return result;
    } catch (error) {
        console.error('Error in ipcMain handle updateSettings:', error);
        return { success: false, message: 'Error in ipcMain handle updateSettings.' };
    }
});

ipcMain.handle('get-agency-types', async () => {
    try {
        const agencyTypes = await settingAgencyTypeController.getAgencyTypesFromDB();
        return agencyTypes;
    } catch (error) {
        console.error('Error fetching agency types:', error);
        return [];
    }
});

ipcMain.handle('save-distribute-data', async (event, formData) => {
    try {
        return saveFormData(formData);
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
