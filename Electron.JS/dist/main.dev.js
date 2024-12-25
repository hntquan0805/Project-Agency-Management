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

var _require7 = require('./controllers/settingAgencyTypeController'),
    updateAgencyTypeSettings = _require7.updateAgencyTypeSettings,
    getAgencyTypesFromDB = _require7.getAgencyTypesFromDB;

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
  mainWindow.loadFile(path.join(__dirname, 'views/setting.html'));
});
ipcMain.handle('search', function _callee(event, criteria) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(searchAgencies(criteria));

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
ipcMain.handle('add-agency', function _callee2(event, agencyData) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(addAgency({
            body: agencyData
          }));

        case 3:
          return _context2.abrupt("return", _context2.sent);

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          return _context2.abrupt("return", {
            success: false,
            message: 'Error adding data!'
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
ipcMain.handle('agency-rule-1', function _callee3(event, updateData) {
  var result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(updateSettings(updateData));

        case 3:
          result = _context3.sent;
          return _context3.abrupt("return", result);

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error('Error in ipcMain handle updateSettings:', _context3.t0);
          return _context3.abrupt("return", {
            success: false,
            message: 'Error in ipcMain handle updateSettings.'
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
ipcMain.handle('agency-type-1', function _callee4(event, updateData) {
  var result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(updateAgencyTypeSettings(updateData));

        case 3:
          result = _context4.sent;
          return _context4.abrupt("return", result);

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error('Error in ipcMain handle updateSettings:', _context4.t0);
          return _context4.abrupt("return", {
            success: false,
            message: 'Error in ipcMain handle updateSettings.'
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
ipcMain.handle('get-agency-types', function _callee5() {
  var agencyTypes;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(getAgencyTypesFromDB());

        case 3:
          agencyTypes = _context5.sent;
          console.log(agencyTypes);
          return _context5.abrupt("return", agencyTypes);

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.error('Error fetching agency types:', _context5.t0);
          return _context5.abrupt("return", []);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
ipcMain.handle('sign-up', function _callee6(event, _ref) {
  var username, password;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          username = _ref.username, password = _ref.password;
          _context6.next = 3;
          return regeneratorRuntime.awrap(signUpUser(username, password));

        case 3:
          return _context6.abrupt("return", _context6.sent);

        case 4:
        case "end":
          return _context6.stop();
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