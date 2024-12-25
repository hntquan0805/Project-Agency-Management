"use strict";

var _require = require('../models/agency'),
    Agency = _require.Agency;

var _require2 = require('../models/regulation'),
    Regulation = _require2.Regulation;

function addAgency(agencyData) {
  var _agencyData$body, name, phone, email, type, address, onboardDate, district, regulation, maxAgenciesPerDistrict, agencyCountInDistrict, lastAgency, nextNumber, agencyCode, existingAgency, agencies;

  return regeneratorRuntime.async(function addAgency$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _agencyData$body = agencyData.body, name = _agencyData$body.name, phone = _agencyData$body.phone, email = _agencyData$body.email, type = _agencyData$body.type, address = _agencyData$body.address, onboardDate = _agencyData$body.onboardDate, district = _agencyData$body.district;
          _context.prev = 1;
          _context.next = 4;
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
          return regeneratorRuntime.awrap(Agency.findOne({
            order: [['agencyCode', 'DESC']],
            attributes: ['agencyCode']
          }));

        case 13:
          lastAgency = _context.sent;
          nextNumber = lastAgency ? parseInt(lastAgency.agencyCode.substring(2)) + 1 : 1;
          agencyCode = "AG".concat(nextNumber.toString().padStart(3, '0')); // Check if the agency already exists

          _context.next = 18;
          return regeneratorRuntime.awrap(Agency.findOne({
            where: {
              name: name
            }
          }));

        case 18:
          existingAgency = _context.sent;

          if (!existingAgency) {
            _context.next = 21;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: 'An agency with this name already exists.'
          });

        case 21:
          _context.next = 23;
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

        case 23:
          _context.next = 25;
          return regeneratorRuntime.awrap(Agency.findAll());

        case 25:
          agencies = _context.sent;
          return _context.abrupt("return", {
            success: true,
            agencies: agencies
          });

        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](1);
          console.error('Error in addAgency:', _context.t0);
          return _context.abrupt("return", {
            success: false,
            message: "Error adding agency: ".concat(_context.t0.message)
          });

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 29]]);
}

module.exports = {
  addAgency: addAgency
};