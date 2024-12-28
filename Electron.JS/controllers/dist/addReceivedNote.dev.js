"use strict";

var _require = require('../models/paymentreceipt'),
    PaymentReceipt = _require.PaymentReceipt;

var _require2 = require('../models/agency'),
    Agency = _require2.Agency;

var saveGoodsReceivedNote = function saveGoodsReceivedNote(formData) {
  var agencyName, address, phoneNumber, email, amount, date, agency, agencyCode, latestReceipt, newCode, lastCode, numberPart, newNumberPart;
  return regeneratorRuntime.async(function saveGoodsReceivedNote$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          agencyName = formData.agencyName, address = formData.address, phoneNumber = formData.phoneNumber, email = formData.email, amount = formData.amount, date = formData.date;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(Agency.findOne({
            where: {
              name: agencyName,
              address: address,
              phone: phoneNumber,
              email: email
            }
          }));

        case 4:
          agency = _context.sent;

          if (agency) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", {
            success: false,
            message: 'No matching agency found!'
          });

        case 7:
          agencyCode = agency.agencyCode;
          _context.next = 10;
          return regeneratorRuntime.awrap(PaymentReceipt.findOne({
            order: [['paymentReceiptCode', 'DESC']]
          }));

        case 10:
          latestReceipt = _context.sent;
          newCode = 'PR001';

          if (latestReceipt) {
            lastCode = latestReceipt.paymentReceiptCode;
            numberPart = parseInt(lastCode.substring(2));
            newNumberPart = numberPart + 1;
            newCode = "PR".concat(String(newNumberPart).padStart(3, '0'));
          }

          _context.next = 15;
          return regeneratorRuntime.awrap(PaymentReceipt.create({
            paymentReceiptCode: newCode,
            paymentDate: new Date(date),
            amount: parseFloat(amount),
            agencyCode: agencyCode,
            createdBy: 'AC001'
          }));

        case 15:
          return _context.abrupt("return", {
            success: true,
            message: 'Payment receipt has been successfully saved!',
            paymentReceiptCode: newCode
          });

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](1);
          console.error('Error while saving payment receipt:', _context.t0);
          return _context.abrupt("return", {
            success: false,
            message: 'An error occurred while saving the payment receipt!'
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 18]]);
};

module.exports = {
  saveGoodsReceivedNote: saveGoodsReceivedNote
};