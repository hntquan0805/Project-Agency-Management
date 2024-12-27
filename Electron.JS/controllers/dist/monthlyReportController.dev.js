"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../models/deliverynote'),
    DeliveryNote = _require.DeliveryNote;

var _require2 = require('../models/agency'),
    Agency = _require2.Agency;

var _require3 = require('../models/deliverynotedetail'),
    DeliveryNoteDetail = _require3.DeliveryNoteDetail;

var _require4 = require('sequelize'),
    Op = _require4.Op;

var searchDeliveryNotesByDate = function searchDeliveryNotesByDate(criteria) {
  var month, year, where, startDate, endDate, result;
  return regeneratorRuntime.async(function searchDeliveryNotesByDate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          month = criteria.month, year = criteria.year;
          where = {};

          if (month && year) {
            // Tạo ngày bắt đầu và ngày kết thúc của tháng
            startDate = new Date(year, month - 1, 1); // Ngày đầu tháng

            endDate = new Date(year, month, 0); // Ngày cuối tháng
            // Đảm bảo chỉ so sánh ngày (không có giờ)

            startDate.setHours(0, 0, 0, 0); // Đặt giờ thành 00:00:00

            endDate.setHours(23, 59, 59, 999); // Đặt giờ cuối ngày thành 23:59:59

            where.deliveryDate = _defineProperty({}, Op.between, [startDate, endDate]);
          }

          ;
          _context.next = 7;
          return regeneratorRuntime.awrap(DeliveryNote.findAll({
            where: where
          }));

        case 7:
          result = _context.sent;
          console.log(result); // In ra dữ liệu thực tế

          return _context.abrupt("return", result);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error('Error:', _context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

var countNoteByAgency = function countNoteByAgency(deliveryNotes) {
  var countByAgency, agencyCodes, agencies;
  return regeneratorRuntime.async(function countNoteByAgency$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;

          if (!(!deliveryNotes || deliveryNotes.length === 0)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", []);

        case 3:
          countByAgency = {};
          deliveryNotes.forEach(function (note) {
            var agencyCode = note.dataValues.agencyCode;
            console.log(agencyCode);

            if (!countByAgency[agencyCode]) {
              countByAgency[agencyCode] = 0;
            }

            countByAgency[agencyCode]++;
          });
          agencyCodes = Object.keys(countByAgency);
          _context2.next = 8;
          return regeneratorRuntime.awrap(Agency.findAll({
            where: {
              agencyCode: agencyCodes
            },
            attributes: ['agencyCode', 'name'] // Chỉ lấy các trường cần thiết

          }));

        case 8:
          agencies = _context2.sent;
          // Cập nhật name vào countByAgency
          agencies.forEach(function (agency) {
            var agencyCode = agency.agencyCode;

            if (countByAgency[agencyCode]) {
              countByAgency[agencyCode].name = agency.name;
            }
          });
          console.log(countByAgency); //const sumPrice = sumTotalPriceByAgency(deliveryNotes);

          return _context2.abrupt("return", countByAgency);

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.error('Error:', _context2.t0);

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

var sumTotalPriceByAgency = function sumTotalPriceByAgency(deliveryNotes) {
  var totalPriceByAgency, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, note, agencyCode, dnCode, details, totalForNote;

  return regeneratorRuntime.async(function sumTotalPriceByAgency$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;

          if (!(!deliveryNotes || deliveryNotes.length === 0)) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", []);

        case 3:
          // Tạo một đối tượng để lưu tổng giá trị theo agency
          totalPriceByAgency = {}; // Duyệt qua từng DeliveryNote và truy vấn DeliveryNoteDetail

          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 7;
          _iterator = deliveryNotes[Symbol.iterator]();

        case 9:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context3.next = 21;
            break;
          }

          note = _step.value;
          agencyCode = note.dataValues.agencyCode; // Lấy agencyCode từ DeliveryNote

          dnCode = note.dataValues.deliveryNoteCode; // Lấy ID của DeliveryNote
          // Truy vấn tổng giá trị totalPrice từ DeliveryNoteDetail

          _context3.next = 15;
          return regeneratorRuntime.awrap(DeliveryNoteDetail.findAll({
            where: {
              deliveryNoteCode: dnCode
            },
            attributes: ['totalPrice']
          }));

        case 15:
          details = _context3.sent;
          // Tính tổng giá trị totalPrice từ DeliveryNoteDetail
          totalForNote = details.reduce(function (sum, detail) {
            return sum + (detail.totalPrice || 0); // Cộng dồn giá trị totalPrice
          }, 0); // Nếu agencyCode đã tồn tại trong totalPriceByAgency, cộng dồn giá trị

          if (totalPriceByAgency[agencyCode]) {
            totalPriceByAgency[agencyCode] += totalForNote;
          } else {
            // Nếu chưa tồn tại, khởi tạo tổng giá trị ban đầu
            totalPriceByAgency[agencyCode] = totalForNote;
          }

        case 18:
          _iteratorNormalCompletion = true;
          _context3.next = 9;
          break;

        case 21:
          _context3.next = 27;
          break;

        case 23:
          _context3.prev = 23;
          _context3.t0 = _context3["catch"](7);
          _didIteratorError = true;
          _iteratorError = _context3.t0;

        case 27:
          _context3.prev = 27;
          _context3.prev = 28;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 30:
          _context3.prev = 30;

          if (!_didIteratorError) {
            _context3.next = 33;
            break;
          }

          throw _iteratorError;

        case 33:
          return _context3.finish(30);

        case 34:
          return _context3.finish(27);

        case 35:
          return _context3.abrupt("return", totalPriceByAgency);

        case 38:
          _context3.prev = 38;
          _context3.t1 = _context3["catch"](0);
          console.error('Error:', _context3.t1);

        case 41:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 38], [7, 23, 27, 35], [28,, 30, 34]]);
};

module.exports = {
  searchDeliveryNotesByDate: searchDeliveryNotesByDate,
  countNoteByAgency: countNoteByAgency
};