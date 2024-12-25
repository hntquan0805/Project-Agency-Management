"use strict";

// Import model Regulation (assuming you have defined the Regulation model)
var _require = require('../models/regulation'),
    Regulation = _require.Regulation;

var _require2 = require('../models/agency'),
    Agency = _require2.Agency;

var _require3 = require('../models/agencyType'),
    AgencyType = _require3.AgencyType;

var _require4 = require('sequelize'),
    Sequelize = _require4.Sequelize; // Update settings function


function updateAgencyTypeSettings(updateData) {
  var agencyType;
  return regeneratorRuntime.async(function updateAgencyTypeSettings$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(AgencyType.findOne({
            where: {
              type: updateData.agencyType
            }
          }));

        case 3:
          agencyType = _context.sent;

          if (agencyType) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: 'Agency type does not exist.'
          });

        case 6:
          // Update maxDebt and unitCount fields
          agencyType.maxDebt = updateData.inputMaximumDebt;
          agencyType.productCount = updateData.inputMaxGoodsPerBill; // Save changes to the database

          _context.next = 10;
          return regeneratorRuntime.awrap(agencyType.save());

        case 10:
          return _context.abrupt("return", {
            success: true,
            message: 'Update successful.',
            updatedAgencyType: agencyType
          });

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error('Error updating settings:', _context.t0);
          return _context.abrupt("return", {
            success: false,
            message: 'Error updating settings'
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
} // Function to query the database to get the list of agency types


function getAgencyTypesFromDB() {
  var agencyTypes;
  return regeneratorRuntime.async(function getAgencyTypesFromDB$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(AgencyType.findAll({
            attributes: ['type'] // Only get the `type` field

          }));

        case 3:
          agencyTypes = _context2.sent;
          console.log(agencyTypes.map(function (agencyType) {
            return agencyType.type;
          }));
          return _context2.abrupt("return", agencyTypes.map(function (agencyType) {
            return agencyType.type;
          }));

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error('Error fetching agency types:', _context2.t0);
          return _context2.abrupt("return", []);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

module.exports = {
  updateAgencyTypeSettings: updateAgencyTypeSettings,
  getAgencyTypesFromDB: getAgencyTypesFromDB
};