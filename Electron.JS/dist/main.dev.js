"use strict";

var _require = require('electron'),
    app = _require.app,
    BrowserWindow = _require.BrowserWindow,
    ipcMain = _require.ipcMain,
    screen = _require.screen;

var _require2 = require('./controllers/userController'),
    signUpUser = _require2.signUpUser;

var _require3 = require('./controllers/agencyController'),
    addAgency = _require3.addAgency;

var _require4 = require('./config/database'),
    connect = _require4.connect;

var _require5 = require('./controllers/searchAgencyController'),
    searchAgencies = _require5.searchAgencies;

var _require6 = require('./controllers/settingAgencyRuleController'),
    updateSettings = _require6.updateSettings;

var _require7 = require('./controllers/getProductsByAgency'),
    getProductsByAgency = _require7.getProductsByAgency;

var _require8 = require('./controllers/settingAgencyTypeController'),
    updateAgencyTypeSettings = _require8.updateAgencyTypeSettings,
    getAgencyTypesFromDB = _require8.getAgencyTypesFromDB;

var _require9 = require('./controllers/monthlyReportController'),
    searchDeliveryNotesByDate = _require9.searchDeliveryNotesByDate,
    countNoteByAgency = _require9.countNoteByAgency;

var path = require('path');

connect();
var mainWindow;
app.on('ready', function () {
  var _screen$getPrimaryDis = screen.getPrimaryDisplay().workAreaSize,
      width = _screen$getPrimaryDis.width,
      height = _screen$getPrimaryDis.height;
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: true
    }
  });
  mainWindow.loadFile(path.join(__dirname, 'views/monthlyReport.html'));
});
ipcMain.handle('get-products', function _callee(event, type) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(getProductsByAgency(type));

        case 3:
          return _context.abrupt("return", _context.sent);

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          return _context.abrupt("return", {
            success: false,
            message: 'Error fectching data!'
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
ipcMain.handle('search', function _callee2(event, criteria) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(searchAgencies(criteria));

        case 3:
          return _context2.abrupt("return", _context2.sent);

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          return _context2.abrupt("return", {
            success: false,
            message: 'Error fectching data!'
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
ipcMain.handle('search-by-month', function _callee3(event, criteria) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(searchDeliveryNotesByDate(criteria));

        case 3:
          return _context3.abrupt("return", _context3.sent);

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          return _context3.abrupt("return", {
            success: false,
            message: 'Error fectching data!'
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
ipcMain.handle('count-agency', function _callee4(event, criteria) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(countNoteByAgency(criteria));

        case 3:
          return _context4.abrupt("return", _context4.sent);

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          return _context4.abrupt("return", {
            success: false,
            message: 'Error fectching data!'
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
ipcMain.handle('add-agency', function _callee5(event, agencyData) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(addAgency({
            body: agencyData
          }));

        case 3:
          return _context5.abrupt("return", _context5.sent);

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          return _context5.abrupt("return", {
            success: false,
            message: 'Error adding data!'
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
ipcMain.handle('agency-rule-1', function _callee6(event, updateData) {
  var result;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(updateSettings(updateData));

        case 3:
          result = _context6.sent;
          return _context6.abrupt("return", result);

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.error('Error in ipcMain handle updateSettings:', _context6.t0);
          return _context6.abrupt("return", {
            success: false,
            message: 'Error in ipcMain handle updateSettings.'
          });

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
ipcMain.handle('agency-type-1', function _callee7(event, updateData) {
  var result;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(updateAgencyTypeSettings(updateData));

        case 3:
          result = _context7.sent;
          return _context7.abrupt("return", result);

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          console.error('Error in ipcMain handle updateSettings:', _context7.t0);
          return _context7.abrupt("return", {
            success: false,
            message: 'Error in ipcMain handle updateSettings.'
          });

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
ipcMain.handle('get-agency-types', function _callee8() {
  var agencyTypes;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(getAgencyTypesFromDB());

        case 3:
          agencyTypes = _context8.sent;
          console.log(agencyTypes);
          return _context8.abrupt("return", agencyTypes);

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          console.error('Error fetching agency types:', _context8.t0);
          return _context8.abrupt("return", []);

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
ipcMain.handle('sign-up', function _callee9(event, _ref) {
  var username, password;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          username = _ref.username, password = _ref.password;
          _context9.next = 3;
          return regeneratorRuntime.awrap(signUpUser(username, password));

        case 3:
          return _context9.abrupt("return", _context9.sent);

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});