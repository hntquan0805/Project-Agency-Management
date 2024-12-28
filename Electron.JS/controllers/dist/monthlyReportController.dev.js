"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../models/deliverynote'),
    DeliveryNote = _require.DeliveryNote;

var _require2 = require('../models/agency'),
    Agency = _require2.Agency;

var _require3 = require('../models/deliverynotedetail'),
    DeliveryNoteDetail = _require3.DeliveryNoteDetail;

var _require4 = require('../models/paymentreceipt'),
    PaymentReceipt = _require4.PaymentReceipt;

var _require5 = require('../models/revenuereport'),
    RevenueReport = _require5.RevenueReport;

var _require6 = require('../models/debthistory'),
    DebtHistory = _require6.DebtHistory;

var _require7 = require('sequelize'),
    Op = _require7.Op;

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
            startDate = new Date(year, month - 1, 1);
            endDate = new Date(year, month, 0);
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
            where.deliveryDate = _defineProperty({}, Op.between, [startDate, endDate]);
          }

          ;
          _context.next = 7;
          return regeneratorRuntime.awrap(DeliveryNote.findAll({
            where: where
          }));

        case 7:
          result = _context.sent;
          return _context.abrupt("return", result);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error('Error:', _context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

var countNoteByAgency = function countNoteByAgency(deliveryNotes) {
  var countByAgency, agencyCodes, agencies, totalPriceByAgency, agencyCode;
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

            if (!countByAgency[agencyCode]) {
              countByAgency[agencyCode] = {
                count: 0,
                totalPrice: 0
              };
            }

            countByAgency[agencyCode].count++;
          });
          agencyCodes = Object.keys(countByAgency);
          _context2.next = 8;
          return regeneratorRuntime.awrap(Agency.findAll({
            where: {
              agencyCode: agencyCodes
            },
            attributes: ['agencyCode', 'name']
          }));

        case 8:
          agencies = _context2.sent;
          agencies.forEach(function (agency) {
            var agencyCode = agency.agencyCode;

            if (countByAgency[agencyCode]) {
              countByAgency[agencyCode].name = agency.name;
            }
          });
          _context2.next = 12;
          return regeneratorRuntime.awrap(sumTotalPriceByAgency(deliveryNotes));

        case 12:
          totalPriceByAgency = _context2.sent;

          for (agencyCode in totalPriceByAgency) {
            if (countByAgency[agencyCode]) {
              countByAgency[agencyCode].totalPrice = totalPriceByAgency[agencyCode];
            }
          }

          return _context2.abrupt("return", countByAgency);

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          console.error('Error:', _context2.t0);

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 17]]);
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
          totalPriceByAgency = {};
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
          agencyCode = note.dataValues.agencyCode;
          dnCode = note.dataValues.deliveryNoteCode;
          _context3.next = 15;
          return regeneratorRuntime.awrap(DeliveryNoteDetail.findAll({
            where: {
              deliveryNoteCode: dnCode
            },
            attributes: ['totalPrice']
          }));

        case 15:
          details = _context3.sent;
          totalForNote = details.reduce(function (sum, detail) {
            return sum + (detail.totalPrice || 0);
          }, 0);

          if (totalPriceByAgency[agencyCode]) {
            totalPriceByAgency[agencyCode] += totalForNote;
          } else {
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

var calculateProportion = function calculateProportion(table) {
  var totalSum = 0;

  for (var agencyCode in table) {
    totalSum += table[agencyCode].totalPrice || 0;
  }

  for (var _agencyCode in table) {
    var agency = table[_agencyCode];
    agency.proportion = totalSum === 0 ? 0 : ((agency.totalPrice || 0) * 100 / totalSum).toFixed(2); // Làm tròn 2 chữ số
  }

  return table;
};

var getTotalDebtBeforeMonth = function getTotalDebtBeforeMonth(month, year) {
  var _ret;

  return regeneratorRuntime.async(function getTotalDebtBeforeMonth$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(function _callee() {
            var startDate, deliveryNotes, totalDebts, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop, _iterator2, _step2;

            return regeneratorRuntime.async(function _callee$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    startDate = new Date(year, month - 1, 1);
                    _context5.next = 3;
                    return regeneratorRuntime.awrap(DeliveryNote.findAll({
                      where: {
                        deliveryDate: _defineProperty({}, Op.lt, startDate)
                      },
                      attributes: ['deliveryNoteCode', 'agencyCode']
                    }));

                  case 3:
                    deliveryNotes = _context5.sent;
                    totalDebts = {};
                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    _context5.prev = 8;

                    _loop = function _loop() {
                      var note, deliveryNoteDetails, agencyCode;
                      return regeneratorRuntime.async(function _loop$(_context4) {
                        while (1) {
                          switch (_context4.prev = _context4.next) {
                            case 0:
                              note = _step2.value;
                              _context4.next = 3;
                              return regeneratorRuntime.awrap(DeliveryNoteDetail.findAll({
                                where: {
                                  deliveryNoteCode: note.deliveryNoteCode
                                },
                                attributes: ['totalPrice']
                              }));

                            case 3:
                              deliveryNoteDetails = _context4.sent;
                              agencyCode = note.agencyCode;

                              if (!totalDebts[agencyCode]) {
                                totalDebts[agencyCode] = 0;
                              }

                              deliveryNoteDetails.forEach(function (detail) {
                                totalDebts[agencyCode] += detail.totalPrice;
                              });

                            case 7:
                            case "end":
                              return _context4.stop();
                          }
                        }
                      });
                    };

                    _iterator2 = deliveryNotes[Symbol.iterator]();

                  case 11:
                    if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                      _context5.next = 17;
                      break;
                    }

                    _context5.next = 14;
                    return regeneratorRuntime.awrap(_loop());

                  case 14:
                    _iteratorNormalCompletion2 = true;
                    _context5.next = 11;
                    break;

                  case 17:
                    _context5.next = 23;
                    break;

                  case 19:
                    _context5.prev = 19;
                    _context5.t0 = _context5["catch"](8);
                    _didIteratorError2 = true;
                    _iteratorError2 = _context5.t0;

                  case 23:
                    _context5.prev = 23;
                    _context5.prev = 24;

                    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                      _iterator2["return"]();
                    }

                  case 26:
                    _context5.prev = 26;

                    if (!_didIteratorError2) {
                      _context5.next = 29;
                      break;
                    }

                    throw _iteratorError2;

                  case 29:
                    return _context5.finish(26);

                  case 30:
                    return _context5.finish(23);

                  case 31:
                    return _context5.abrupt("return", {
                      v: totalDebts
                    });

                  case 32:
                  case "end":
                    return _context5.stop();
                }
              }
            }, null, null, [[8, 19, 23, 31], [24,, 26, 30]]);
          }());

        case 3:
          _ret = _context6.sent;

          if (!(_typeof(_ret) === "object")) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", _ret.v);

        case 6:
          _context6.next = 11;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.error('Error calculating total debt before the specified month:', _context6.t0);

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var getPaymentsBeforeMonth = function getPaymentsBeforeMonth(month, year) {
  var startDate, previousPayments;
  return regeneratorRuntime.async(function getPaymentsBeforeMonth$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          startDate = new Date(year, month - 1, 1);
          _context7.next = 4;
          return regeneratorRuntime.awrap(PaymentReceipt.findAll({
            where: {
              paymentDate: _defineProperty({}, Op.lt, startDate)
            },
            attributes: ['agencyCode', 'amount', 'paymentDate']
          }));

        case 4:
          previousPayments = _context7.sent;
          return _context7.abrupt("return", previousPayments);

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](0);
          console.error('Error fetching payments before the specified month:', _context7.t0);

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var renderDebtTable = function renderDebtTable(month, year, table) {
  var agencies, debtData, debtBefore, payBefore, initDebtData, _loop2, agencyCode, _agencyCode2, startDate, endDate, paymentReceipts, _agencyCode3, agency;

  return regeneratorRuntime.async(function renderDebtTable$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(Agency.findAll({
            attributes: ['agencyCode', 'name']
          }));

        case 3:
          agencies = _context8.sent;
          debtData = {};
          agencies.forEach(function (agency) {
            var agencyData = table[agency.agencyCode];

            if (agencyData) {
              console.log("Data for ".concat(agency.agencyCode, ":"), agencyData);
              debtData[agency.agencyCode] = {
                name: agency.name,
                initialDebt: 0,
                incurredCost: agencyData.totalPrice,
                finalDebt: 0
              };
            } else {
              debtData[agency.agencyCode] = {
                name: agency.name,
                initialDebt: 0,
                incurredCost: 0,
                finalDebt: 0
              };
            }
          });
          _context8.next = 8;
          return regeneratorRuntime.awrap(getTotalDebtBeforeMonth(month, year));

        case 8:
          debtBefore = _context8.sent;
          _context8.next = 11;
          return regeneratorRuntime.awrap(getPaymentsBeforeMonth(month, year));

        case 11:
          payBefore = _context8.sent;
          initDebtData = {};

          _loop2 = function _loop2(agencyCode) {
            var totalDebt = debtBefore[agencyCode];
            var totalPaid = 0;
            payBefore.forEach(function (payment) {
              if (payment.agencyCode === agencyCode) {
                totalPaid += payment.amount;
              }
            });
            initDebtData[agencyCode] = totalDebt - totalPaid;
          };

          for (agencyCode in debtBefore) {
            _loop2(agencyCode);
          }

          for (_agencyCode2 in initDebtData) {
            if (debtData[_agencyCode2]) {
              debtData[_agencyCode2].initialDebt = initDebtData[_agencyCode2];
            }
          }

          startDate = new Date(year, month - 1, 1);
          endDate = new Date(year, month, 0);
          _context8.next = 20;
          return regeneratorRuntime.awrap(PaymentReceipt.findAll({
            where: {
              paymentDate: _defineProperty({}, Op.between, [startDate, endDate])
            },
            attributes: ['agencyCode', 'amount']
          }));

        case 20:
          paymentReceipts = _context8.sent;
          paymentReceipts.forEach(function (receipt) {
            if (debtData[receipt.agencyCode]) {
              debtData[receipt.agencyCode].incurredCost -= receipt.amount;
            }
          });

          for (_agencyCode3 in debtData) {
            agency = debtData[_agencyCode3];
            agency.finalDebt = agency.initialDebt + agency.incurredCost;
          }

          return _context8.abrupt("return", debtData);

        case 26:
          _context8.prev = 26;
          _context8.t0 = _context8["catch"](0);
          console.error('Error rendering debt table:', _context8.t0);

        case 29:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 26]]);
};

function saveRevenueReport(month, year, reportData) {
  var dateString, agencyCode, note, existingReport;
  return regeneratorRuntime.async(function saveRevenueReport$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          console.log("Month: ", month, "Year: ", year);
          dateString = "".concat(year, "-").concat(String(month).padStart(2, '0'), "-01");
          console.log(dateString);
          _context9.t0 = regeneratorRuntime.keys(reportData);

        case 5:
          if ((_context9.t1 = _context9.t0()).done) {
            _context9.next = 17;
            break;
          }

          agencyCode = _context9.t1.value;
          note = reportData[agencyCode];
          _context9.next = 10;
          return regeneratorRuntime.awrap(RevenueReport.findOne({
            where: {
              agencyCode: agencyCode,
              date: new Date(dateString)
            }
          }));

        case 10:
          existingReport = _context9.sent;

          if (!existingReport) {
            _context9.next = 13;
            break;
          }

          return _context9.abrupt("continue", 5);

        case 13:
          _context9.next = 15;
          return regeneratorRuntime.awrap(RevenueReport.create({
            date: new Date(dateString),
            agencyCode: agencyCode,
            numberOfDeliveryNotes: note.count || 0,
            totalValue: note.totalPrice || 0,
            rate: note.proportion || 0
          }));

        case 15:
          _context9.next = 5;
          break;

        case 17:
          _context9.next = 22;
          break;

        case 19:
          _context9.prev = 19;
          _context9.t2 = _context9["catch"](0);
          throw new Error('Failed to save revenue report: ' + _context9.t2.message);

        case 22:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 19]]);
}

function saveDebtHistory(month, year, table_debt) {
  var dateString, agencyCode, note, existingDebt;
  return regeneratorRuntime.async(function saveDebtHistory$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          console.log("Month: ", month, "Year: ", year);
          dateString = "".concat(year, "-").concat(String(month).padStart(2, '0'), "-01"); // Ngày 1 của tháng

          console.log(dateString); // Duyệt qua các agency trong bảng table_debt

          _context10.t0 = regeneratorRuntime.keys(table_debt);

        case 5:
          if ((_context10.t1 = _context10.t0()).done) {
            _context10.next = 18;
            break;
          }

          agencyCode = _context10.t1.value;
          note = table_debt[agencyCode]; // Kiểm tra xem có báo cáo nợ nào với cùng agencyCode và date trong cơ sở dữ liệu chưa

          _context10.next = 10;
          return regeneratorRuntime.awrap(DebtHistory.findOne({
            where: {
              agencyCode: agencyCode,
              date: new Date(dateString) // Kiểm tra theo ngày tháng đã định dạng

            }
          }));

        case 10:
          existingDebt = _context10.sent;

          if (!existingDebt) {
            _context10.next = 14;
            break;
          }

          console.log("Debt report for ".concat(agencyCode, " in ").concat(dateString, " already exists. Skipping..."));
          return _context10.abrupt("continue", 5);

        case 14:
          _context10.next = 16;
          return regeneratorRuntime.awrap(DebtHistory.create({
            agencyCode: agencyCode,
            date: new Date(dateString),
            initialDebt: note.initialDebt || 0,
            endDebt: note.finalDebt || 0,
            incurredDebt: note.incurredCost || 0
          }));

        case 16:
          _context10.next = 5;
          break;

        case 18:
          console.log("Debt reports saved successfully.");
          _context10.next = 24;
          break;

        case 21:
          _context10.prev = 21;
          _context10.t2 = _context10["catch"](0);
          throw new Error('Failed to save debt history: ' + _context10.t2.message);

        case 24:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 21]]);
}

module.exports = {
  searchDeliveryNotesByDate: searchDeliveryNotesByDate,
  countNoteByAgency: countNoteByAgency,
  calculateProportion: calculateProportion,
  renderDebtTable: renderDebtTable,
  saveRevenueReport: saveRevenueReport,
  saveDebtHistory: saveDebtHistory
};