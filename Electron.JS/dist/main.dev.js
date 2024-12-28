"use strict";

var _require = require('electron'),
    app = _require.app,
    BrowserWindow = _require.BrowserWindow,
    ipcMain = _require.ipcMain,
    screen = _require.screen;

var _require2 = require('./config/database'),
    connect = _require2.connect;

var _require3 = require('./controllers/userController'),
    signUpUser = _require3.signUpUser;

var _require4 = require('./controllers/agencyController'),
    addAgency = _require4.addAgency;

var _require5 = require('./controllers/searchAgencyController'),
    searchAgencies = _require5.searchAgencies;

var _require6 = require('./controllers/settingAgencyRuleController'),
    updateSettings = _require6.updateSettings;

var _require7 = require('./controllers/getProductsByAgencyController'),
    getProductsByAgency = _require7.getProductsByAgency,
    getProductsByCode = _require7.getProductsByCode;

var _require8 = require('./controllers/settingAgencyTypeController'),
    updateAgencyTypeSettings = _require8.updateAgencyTypeSettings,
    getAgencyTypesFromDB = _require8.getAgencyTypesFromDB;

var _require9 = require('./controllers/monthlyReportController'),
    searchDeliveryNotesByDate = _require9.searchDeliveryNotesByDate,
    countNoteByAgency = _require9.countNoteByAgency,
    calculateProportion = _require9.calculateProportion,
    renderDebtTable = _require9.renderDebtTable,
    saveRevenueReport = _require9.saveRevenueReport,
    saveDebtHistory = _require9.saveDebtHistory;

var _require10 = require('./controllers/addReceivedNote'),
    saveGoodsReceivedNote = _require10.saveGoodsReceivedNote;

var path = require('path');

var _require11 = require('./controllers/editProductsByAgencyController'),
    deleteProductByAgency = _require11.deleteProductByAgency;

var _require12 = require('./controllers/editProductsByAgencyController'),
    updateProductByAgency = _require12.updateProductByAgency;

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
  mainWindow.loadFile(path.join(__dirname, 'views/goodReceivedNote.html'));
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
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(getProductsByAgency(type));

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
ipcMain.handle('search-by-month', function _callee6(event, criteria) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(searchDeliveryNotesByDate(criteria));

        case 3:
          return _context6.abrupt("return", _context6.sent);

        case 6:
          _context6.prev = 6;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          return _context6.abrupt("return", {
            success: false,
            message: 'Error fectching data!'
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
ipcMain.handle('save-received-note', function _callee7(event, criteria) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(saveGoodsReceivedNote(criteria));

        case 3:
          return _context7.abrupt("return", _context7.sent);

        case 6:
          _context7.prev = 6;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);
          return _context7.abrupt("return", {
            success: false,
            message: 'Error fectching data!'
          });

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
ipcMain.handle('count-agency', function _callee8(event, criteria) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(countNoteByAgency(criteria));

        case 3:
          return _context8.abrupt("return", _context8.sent);

        case 6:
          _context8.prev = 6;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0);
          return _context8.abrupt("return", {
            success: false,
            message: 'Error fectching data!'
          });

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
ipcMain.handle('cal-propor', function _callee9(event, criteria) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(calculateProportion(criteria));

        case 3:
          return _context9.abrupt("return", _context9.sent);

        case 6:
          _context9.prev = 6;
          _context9.t0 = _context9["catch"](0);
          console.error(_context9.t0);
          return _context9.abrupt("return", {
            success: false,
            message: 'Error fectching data!'
          });

        case 10:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
ipcMain.handle('debt-report', function _callee10(event, _ref4) {
  var month, year, table;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          month = _ref4.month, year = _ref4.year, table = _ref4.table;
          _context10.prev = 1;
          _context10.next = 4;
          return regeneratorRuntime.awrap(renderDebtTable(month, year, table));

        case 4:
          return _context10.abrupt("return", _context10.sent);

        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](1);
          console.error(_context10.t0);
          return _context10.abrupt("return", {
            success: false,
            message: 'Error fectching data!'
          });

        case 11:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
ipcMain.handle('save-debt-history', function _callee11(event, _ref5) {
  var month, year, table_debt;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          month = _ref5.month, year = _ref5.year, table_debt = _ref5.table_debt;
          _context11.prev = 1;
          _context11.next = 4;
          return regeneratorRuntime.awrap(saveDebtHistory(month, year, table_debt));

        case 4:
          return _context11.abrupt("return", {
            success: true
          });

        case 7:
          _context11.prev = 7;
          _context11.t0 = _context11["catch"](1);
          console.error('Error saving debt history:', _context11.t0);
          return _context11.abrupt("return", {
            success: false,
            message: 'Error saving debt history!'
          });

        case 11:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
ipcMain.handle('save-revenue-report', function _callee12(event, _ref6) {
  var month, year, reportData;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          month = _ref6.month, year = _ref6.year, reportData = _ref6.reportData;
          _context12.prev = 1;
          _context12.next = 4;
          return regeneratorRuntime.awrap(saveRevenueReport(month, year, reportData));

        case 4:
          return _context12.abrupt("return", {
            success: true
          });

        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12["catch"](1);
          console.error('Error saving report to database:', _context12.t0);
          return _context12.abrupt("return", {
            success: false,
            message: _context12.t0.message
          });

        case 11:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
ipcMain.handle('add-agency', function _callee13(event, agencyData) {
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(addAgency({
            body: agencyData
          }));

        case 3:
          return _context13.abrupt("return", _context13.sent);

        case 6:
          _context13.prev = 6;
          _context13.t0 = _context13["catch"](0);
          console.error(_context13.t0);
          return _context13.abrupt("return", {
            success: false,
            message: 'Error adding data!'
          });

        case 10:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
ipcMain.handle('agency-rule-1', function _callee14(event, updateData) {
  var result;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return regeneratorRuntime.awrap(updateSettings(updateData));

        case 3:
          result = _context14.sent;
          return _context14.abrupt("return", result);

        case 7:
          _context14.prev = 7;
          _context14.t0 = _context14["catch"](0);
          console.error('Error in ipcMain handle updateSettings:', _context14.t0);
          return _context14.abrupt("return", {
            success: false,
            message: 'Error in ipcMain handle updateSettings.'
          });

        case 11:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
ipcMain.handle('agency-type-1', function _callee15(event, updateData) {
  var result;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return regeneratorRuntime.awrap(updateAgencyTypeSettings(updateData));

        case 3:
          result = _context15.sent;
          return _context15.abrupt("return", result);

        case 7:
          _context15.prev = 7;
          _context15.t0 = _context15["catch"](0);
          console.error('Error in ipcMain handle updateSettings:', _context15.t0);
          return _context15.abrupt("return", {
            success: false,
            message: 'Error in ipcMain handle updateSettings.'
          });

        case 11:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
ipcMain.handle('get-agency-types', function _callee16() {
  var agencyTypes;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(getAgencyTypesFromDB());

        case 3:
          agencyTypes = _context16.sent;
          console.log(agencyTypes);
          return _context16.abrupt("return", agencyTypes);

        case 8:
          _context16.prev = 8;
          _context16.t0 = _context16["catch"](0);
          console.error('Error fetching agency types:', _context16.t0);
          return _context16.abrupt("return", []);

        case 12:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
ipcMain.handle('sign-up', function _callee17(event, _ref7) {
  var username, password;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          username = _ref7.username, password = _ref7.password;
          _context17.next = 3;
          return regeneratorRuntime.awrap(signUpUser(username, password));

        case 3:
          return _context17.abrupt("return", _context17.sent);

        case 4:
        case "end":
          return _context17.stop();
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