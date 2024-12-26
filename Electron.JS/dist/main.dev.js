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

var _require9 = require('./controllers/editProductsByAgency'),
    deleteProductByAgency = _require9.deleteProductByAgency;

var _require10 = require('./controllers/editProductsByAgency'),
    updateProductByAgency = _require10.updateProductByAgency;

var _require11 = require('./controllers/getProductsByAgency'),
    getProductsByCode = _require11.getProductsByCode;

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
ipcMain.handle('get-products-code', function _callee(event, _ref) {
  var productCode, unit, type;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          productCode = _ref.productCode, unit = _ref.unit, type = _ref.type;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(getProductsByCode(productCode, unit, type));

        case 4:
          return _context.abrupt("return", _context.sent);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          return _context.abrupt("return", {
            success: false,
            message: 'Error fetching data!'
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
ipcMain.handle('update-product', function _callee2(event, _ref2) {
  var productCode, unit, type, price;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          productCode = _ref2.productCode, unit = _ref2.unit, type = _ref2.type, price = _ref2.price;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(updateProductByAgency(productCode, unit, type, price));

        case 4:
          return _context2.abrupt("return", _context2.sent);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0);
          return _context2.abrupt("return", {
            success: false,
            message: 'Error deleting data!'
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
ipcMain.handle('delete-product', function _callee3(event, _ref3) {
  var productCode, unit, type;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          productCode = _ref3.productCode, unit = _ref3.unit, type = _ref3.type;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(deleteProductByAgency(productCode, unit, type));

        case 4:
          return _context3.abrupt("return", _context3.sent);

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0);
          return _context3.abrupt("return", {
            success: false,
            message: 'Error deleting data!'
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
ipcMain.handle('get-products', function _callee4(event, type) {
  var products;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(getProductsByAgency(type));

        case 3:
          products = _context4.sent;
          return _context4.abrupt("return", products);

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          return _context4.abrupt("return", {
            success: false,
            message: 'Error fectching data!'
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
ipcMain.handle('search', function _callee5(event, criteria) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(searchAgencies(criteria));

        case 3:
          return _context5.abrupt("return", _context5.sent);

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          return _context5.abrupt("return", {
            success: false,
            message: 'Error fectching data!'
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
ipcMain.handle('add-agency', function _callee6(event, agencyData) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(addAgency({
            body: agencyData
          }));

        case 3:
          return _context6.abrupt("return", _context6.sent);

        case 6:
          _context6.prev = 6;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          return _context6.abrupt("return", {
            success: false,
            message: 'Error adding data!'
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
ipcMain.handle('agency-rule-1', function _callee7(event, updateData) {
  var result;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(updateSettings(updateData));

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
ipcMain.handle('agency-type-1', function _callee8(event, updateData) {
  var result;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(updateAgencyTypeSettings(updateData));

        case 3:
          result = _context8.sent;
          return _context8.abrupt("return", result);

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          console.error('Error in ipcMain handle updateSettings:', _context8.t0);
          return _context8.abrupt("return", {
            success: false,
            message: 'Error in ipcMain handle updateSettings.'
          });

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
ipcMain.handle('get-agency-types', function _callee9() {
  var agencyTypes;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(getAgencyTypesFromDB());

        case 3:
          agencyTypes = _context9.sent;
          console.log(agencyTypes);
          return _context9.abrupt("return", agencyTypes);

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          console.error('Error fetching agency types:', _context9.t0);
          return _context9.abrupt("return", []);

        case 12:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
ipcMain.handle('sign-up', function _callee10(event, _ref4) {
  var username, password;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          username = _ref4.username, password = _ref4.password;
          _context10.next = 3;
          return regeneratorRuntime.awrap(signUpUser(username, password));

        case 3:
          return _context10.abrupt("return", _context10.sent);

        case 4:
        case "end":
          return _context10.stop();
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