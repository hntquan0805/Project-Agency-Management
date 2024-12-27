"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../models/regulation'),
    Regulation = _require.Regulation;

var _require2 = require('../models/agency'),
    Agency = _require2.Agency;

var _require3 = require('../models/agencytype'),
    AgencyType = _require3.AgencyType;

var _require4 = require('sequelize'),
    Sequelize = _require4.Sequelize;

var updateSettings = function updateSettings(updateData) {
  var regulation, districtsExceedingLimit, districtNames, agencyTypes, emptyAgencyTypes, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, agencyType, count, difference, sortedEmptyAgencyTypes, typesToDelete, typesToCreate, i;

  return regeneratorRuntime.async(function updateSettings$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Regulation.findOne());

        case 3:
          regulation = _context.sent;

          if (regulation) {
            _context.next = 6;
            break;
          }

          throw new Error('No settings found to update');

        case 6:
          if (!(regulation.maxAgenciesPerDistrict > updateData.maxAgentsInDistrict)) {
            _context.next = 13;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(Agency.findAll({
            attributes: ['district', [Sequelize.fn('COUNT', Sequelize.col('agencyCode')), 'agencyCount']],
            group: ['district'],
            having: Sequelize.literal('COUNT(agencyCode) > ' + updateData.maxAgentsInDistrict)
          }));

        case 9:
          districtsExceedingLimit = _context.sent;

          if (!(districtsExceedingLimit.length > 0)) {
            _context.next = 13;
            break;
          }

          districtNames = districtsExceedingLimit.map(function (district) {
            return district.district;
          }).join(', ');
          return _context.abrupt("return", {
            success: false,
            message: "WARNING! The following districts have more agencies than the limit: ".concat(districtNames)
          });

        case 13:
          if (!(regulation.agencyTypeCount > updateData.numAgentTypes)) {
            _context.next = 60;
            break;
          }

          _context.next = 16;
          return regeneratorRuntime.awrap(AgencyType.findAll());

        case 16:
          agencyTypes = _context.sent;
          emptyAgencyTypes = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 21;
          _iterator = agencyTypes[Symbol.iterator]();

        case 23:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 32;
            break;
          }

          agencyType = _step.value;
          _context.next = 27;
          return regeneratorRuntime.awrap(Agency.count({
            where: {
              type: agencyType.type
            }
          }));

        case 27:
          count = _context.sent;

          if (count === 0) {
            emptyAgencyTypes.push(agencyType);
          }

        case 29:
          _iteratorNormalCompletion = true;
          _context.next = 23;
          break;

        case 32:
          _context.next = 38;
          break;

        case 34:
          _context.prev = 34;
          _context.t0 = _context["catch"](21);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 38:
          _context.prev = 38;
          _context.prev = 39;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 41:
          _context.prev = 41;

          if (!_didIteratorError) {
            _context.next = 44;
            break;
          }

          throw _iteratorError;

        case 44:
          return _context.finish(41);

        case 45:
          return _context.finish(38);

        case 46:
          if (!(emptyAgencyTypes.length === 0)) {
            _context.next = 48;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: 'There are more agency types than expected.'
          });

        case 48:
          difference = regulation.agencyTypeCount - updateData.numAgentTypes;

          if (!(difference > emptyAgencyTypes.length)) {
            _context.next = 51;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: 'The difference is too large compared to the number of empty agency types, cannot delete.'
          });

        case 51:
          sortedEmptyAgencyTypes = emptyAgencyTypes.sort(function (a, b) {
            return b.type - a.type;
          });
          typesToDelete = sortedEmptyAgencyTypes.slice(0, difference);
          _context.next = 55;
          return regeneratorRuntime.awrap(AgencyType.destroy({
            where: {
              type: _defineProperty({}, Sequelize.Op["in"], typesToDelete.map(function (type) {
                return type.type;
              }))
            }
          }));

        case 55:
          regulation.agencyTypeCount = updateData.numAgentTypes;
          regulation.maxAgenciesPerDistrict = updateData.maxAgentsInDistrict;
          _context.next = 59;
          return regeneratorRuntime.awrap(regulation.save());

        case 59:
          return _context.abrupt("return", {
            success: true,
            message: 'Deleted empty agency types and updated the number of agency types.',
            updatedSettings: regulation
          });

        case 60:
          typesToCreate = [];

          for (i = regulation.agencyTypeCount + 1; i <= updateData.numAgentTypes; i++) {
            typesToCreate.push({
              type: i,
              productCount: 5,
              unitCount: 3,
              maxDebt: 0
            });
          }

          _context.next = 64;
          return regeneratorRuntime.awrap(AgencyType.bulkCreate(typesToCreate));

        case 64:
          regulation.agencyTypeCount = updateData.numAgentTypes;
          regulation.maxAgenciesPerDistrict = updateData.maxAgentsInDistrict;
          _context.next = 68;
          return regeneratorRuntime.awrap(regulation.save());

        case 68:
          return _context.abrupt("return", {
            success: true,
            updatedSettings: regulation
          });

        case 71:
          _context.prev = 71;
          _context.t1 = _context["catch"](0);
          console.error('Error updating settings:', _context.t1);
          return _context.abrupt("return", {
            success: false,
            message: 'Error updating settings'
          });

        case 75:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 71], [21, 34, 38, 46], [39,, 41, 45]]);
};

module.exports = {
  updateSettings: updateSettings
};