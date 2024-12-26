"use strict";

var _require = require('../models/agency'),
    Agency = _require.Agency;

<<<<<<< HEAD
var _require2 = require('../models/regulation'),
    Regulation = _require2.Regulation;

function addAgency(agencyData) {
  var _agencyData$body, name, phone, email, type, address, onboardDate, district, regulation, maxAgenciesPerDistrict, agencyCountInDistrict, lastAgency, nextNumber, agencyCode, existingAgency, agencies;
=======
var addAgency = function addAgency(agencyData) {
  var _agencyData$body, name, phone, email, type, address, onboardDate, district, lastAgency, nextNumber, agencyCode, existingAgency, agencies;
>>>>>>> 6a94027de80e22c99d83d62baf7a6008aa8cdf50

  return regeneratorRuntime.async(function addAgency$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _agencyData$body = agencyData.body, name = _agencyData$body.name, phone = _agencyData$body.phone, email = _agencyData$body.email, type = _agencyData$body.type, address = _agencyData$body.address, onboardDate = _agencyData$body.onboardDate, district = _agencyData$body.district;
          _context.prev = 1;
          _context.next = 4;
<<<<<<< HEAD
          return regeneratorRuntime.awrap(Regulation.findOne());

        case 4:
          regulation = _context.sent;
          maxAgenciesPerDistrict = regulation ? regulation.maxAgenciesPerDistrict : 4;
          _context.next = 8;
          return regeneratorRuntime.awrap(Agency.count({
            where: {
              district: district
            }
          }));

        case 8:
          agencyCountInDistrict = _context.sent;

          if (!(agencyCountInDistrict >= maxAgenciesPerDistrict)) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: "The number of agencies in the current district has exceeded the allowed limit of ".concat(maxAgenciesPerDistrict, "!")
          });

        case 11:
          _context.next = 13;
=======
>>>>>>> 6a94027de80e22c99d83d62baf7a6008aa8cdf50
          return regeneratorRuntime.awrap(Agency.findOne({
            order: [['agencyCode', 'DESC']],
            attributes: ['agencyCode']
          }));

<<<<<<< HEAD
        case 13:
=======
        case 4:
>>>>>>> 6a94027de80e22c99d83d62baf7a6008aa8cdf50
          lastAgency = _context.sent;
          nextNumber = lastAgency ? parseInt(lastAgency.agencyCode.substring(2)) + 1 : 1;
          agencyCode = "AG".concat(nextNumber.toString().padStart(3, '0')); // Check if the agency already exists

<<<<<<< HEAD
          _context.next = 18;
=======
          _context.next = 9;
>>>>>>> 6a94027de80e22c99d83d62baf7a6008aa8cdf50
          return regeneratorRuntime.awrap(Agency.findOne({
            where: {
              name: name
            }
          }));

<<<<<<< HEAD
        case 18:
          existingAgency = _context.sent;

          if (!existingAgency) {
            _context.next = 21;
=======
        case 9:
          existingAgency = _context.sent;

          if (!existingAgency) {
            _context.next = 12;
>>>>>>> 6a94027de80e22c99d83d62baf7a6008aa8cdf50
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: 'An agency with this name already exists.'
          });

<<<<<<< HEAD
        case 21:
          _context.next = 23;
=======
        case 12:
          _context.next = 14;
>>>>>>> 6a94027de80e22c99d83d62baf7a6008aa8cdf50
          return regeneratorRuntime.awrap(Agency.create({
            agencyCode: agencyCode,
            name: name,
            phone: phone,
            email: email,
            type: type,
            address: address,
            onboardDate: onboardDate,
            district: district
          }));

<<<<<<< HEAD
        case 23:
          _context.next = 25;
          return regeneratorRuntime.awrap(Agency.findAll());

        case 25:
=======
        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(Agency.findAll());

        case 16:
>>>>>>> 6a94027de80e22c99d83d62baf7a6008aa8cdf50
          agencies = _context.sent;
          return _context.abrupt("return", {
            success: true,
            agencies: agencies
          });

<<<<<<< HEAD
        case 29:
          _context.prev = 29;
=======
        case 20:
          _context.prev = 20;
>>>>>>> 6a94027de80e22c99d83d62baf7a6008aa8cdf50
          _context.t0 = _context["catch"](1);
          console.error('Error in addAgency:', _context.t0);
          return _context.abrupt("return", {
            success: false,
            message: "Error adding agency: ".concat(_context.t0.message)
          });

<<<<<<< HEAD
        case 33:
=======
        case 24:
>>>>>>> 6a94027de80e22c99d83d62baf7a6008aa8cdf50
        case "end":
          return _context.stop();
      }
    }
<<<<<<< HEAD
  }, null, null, [[1, 29]]);
}
=======
  }, null, null, [[1, 20]]);
};
>>>>>>> 6a94027de80e22c99d83d62baf7a6008aa8cdf50

module.exports = {
  addAgency: addAgency
};