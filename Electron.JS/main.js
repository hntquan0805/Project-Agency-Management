const { app, BrowserWindow, ipcMain, screen} = require('electron');
const { signUpUser } = require('./controllers/userController');
const { addAgency } = require('./controllers/agencyController');
const { connect } = require('./config/database');
const { searchAgencies } = require('./controllers/searchAgencyController');
const { updateSettings } = require('./controllers/settingAgencyRuleController');
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
=======
    mainWindow.loadFile(path.join(__dirname, 'views/searchAgent.html'));
>>>>>>> 347b6554297e30eb0ef9adaa6d9819282de14d25
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
<<<<<<< HEAD
        console.error('Error in ipcMain handle add-agency:', error);
        return { success: false, message: 'Lỗi xử lý từ backend.' };
=======
        console.error(error);
        return { success: false, message: 'Error adding data!' };
>>>>>>> 347b6554297e30eb0ef9adaa6d9819282de14d25
    }
});

ipcMain.handle('agency-rule-1', async (event, updateData) => {
    try {
        // Giả sử bạn có một hàm updateSettings trong backend để xử lý cập nhật dữ liệu.
        const result = await updateSettings(updateData); // Bạn sẽ thực hiện hành động cần thiết với `updateData`

        return result;
    } catch (error) {
        console.error('Error in ipcMain handle updateSettings:', error);
        return { success: false, message: 'Lỗi xử lý từ backend.' };
    }
});

ipcMain.handle('get-agency-types', async () => {
    try {
        // Lấy danh sách các loại đại lý từ cơ sở dữ liệu
        const agencyTypes = await AgencyType.findAll();
        return agencyTypes; // Trả về danh sách loại đại lý
    } catch (error) {
        console.error('Error fetching agency types:', error);
        return [];  // Trả về mảng rỗng nếu có lỗi
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
