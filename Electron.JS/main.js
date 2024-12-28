const { app, BrowserWindow, ipcMain, screen} = require('electron');
const { connect } = require('./config/database');

const { signUpUser } = require('./controllers/userController');
const { addAgency } = require('./controllers/agencyController');
const { searchAgencies } = require('./controllers/searchAgencyController');
const { updateSettings } = require('./controllers/settingAgencyRuleController');
const { getProductsByAgency, getProductsByCode } = require('./controllers/getProductsByAgencyController');
const { updateAgencyTypeSettings, getAgencyTypesFromDB } = require('./controllers/settingAgencyTypeController');
const { searchDeliveryNotesByDate, countNoteByAgency, calculateProportion, renderDebtTable, saveRevenueReport, saveDebtHistory } = require('./controllers/monthlyReportController');
const { saveGoodsReceivedNote } = require('./controllers/addReceivedNote');
const path = require('path');

const { deleteProductByAgency } = require('./controllers/editProductsByAgencyController');
const { updateProductByAgency } = require('./controllers/editProductsByAgencyController');


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

    mainWindow.loadFile(path.join(__dirname, 'views/goodReceivedNote.html'));
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
        return await updateProductByAgency(productCode, unit, type, price);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error deleting data!' };
    }
});

ipcMain.handle('delete-product', async (event, { productCode, unit, type}) => {
    try {
        return await deleteProductByAgency(productCode, unit, type);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error deleting data!' };
    }
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

ipcMain.handle('save-received-note', async (event, criteria) => {
    try {
        return await saveGoodsReceivedNote(criteria);
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

ipcMain.handle('cal-propor', async (event, criteria) => {
    try {
        return await calculateProportion(criteria);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fectching data!' };
    }
});

ipcMain.handle('debt-report', async (event, { month, year, table }) => {
    try {
        return await renderDebtTable(month, year, table);
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error fectching data!' };
    }
});

ipcMain.handle('save-debt-history', async (event, { month, year, table_debt }) => {
    try {
        await saveDebtHistory(month, year, table_debt);
        return { success: true };
    } catch (error) {
        console.error('Error saving debt history:', error);
        return { success: false, message: 'Error saving debt history!' };
    }
});

ipcMain.handle('save-revenue-report', async (event, { month, year, reportData }) => {
    try {
        // Gọi hàm lưu báo cáo
        await saveRevenueReport(month, year, reportData);
        return { success: true };
    } catch (error) {
        console.error('Error saving report to database:', error);
        return { success: false, message: error.message };
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
