"use strict";

var _require = require('../models/agency'),
    Agency = _require.Agency;

var addAgency = function addAgency(agencyData) {
  var _agencyData$body, name, phone, email, type, address, onboardDate, district, lastAgency, nextNumber, agencyCode, existingAgency, agencies;

  return regeneratorRuntime.async(function addAgency$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _agencyData$body = agencyData.body, name = _agencyData$body.name, phone = _agencyData$body.phone, email = _agencyData$body.email, type = _agencyData$body.type, address = _agencyData$body.address, onboardDate = _agencyData$body.onboardDate, district = _agencyData$body.district;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(Agency.findOne({
            order: [['agencyCode', 'DESC']],
            attributes: ['agencyCode']
          }));

        case 4:
          lastAgency = _context.sent;
          nextNumber = lastAgency ? parseInt(lastAgency.agencyCode.substring(2)) + 1 : 1;
          agencyCode = "AG".concat(nextNumber.toString().padStart(3, '0')); // Check if the agency already exists

          _context.next = 9;
          return regeneratorRuntime.awrap(Agency.findOne({
            where: {
              name: name
            }
          }));

        case 9:
          existingAgency = _context.sent;

          if (!existingAgency) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: 'An agency with this name already exists.'
          });

        case 12:
          _context.next = 14;
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

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(Agency.findAll());

        case 16:
          agencies = _context.sent;
          return _context.abrupt("return", {
            success: true,
            agencies: agencies
          });

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](1);
          console.error('Error in addAgency:', _context.t0);
          return _context.abrupt("return", {
            success: false,
            message: "Error adding agency: ".concat(_context.t0.message)
          });

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 20]]);
};

module.exports = {
  addAgency: addAgency
};