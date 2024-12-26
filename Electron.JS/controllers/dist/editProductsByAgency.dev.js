"use strict";

var _require = require('../models/distribution'),
    Distribution = _require.Distribution;

var deleteProductByAgency = function deleteProductByAgency(productCode, unit, type) {
  return regeneratorRuntime.async(function deleteProductByAgency$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Distribution.destroy({
            where: {
              productCode: productCode,
              unit: unit,
              type: type
            }
          }));

        case 3:
          _context.next = 9;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          throw new Error('Failed to delete product');

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

var updateProductByAgency = function updateProductByAgency(productCode, unit, type, price) {
  return regeneratorRuntime.async(function updateProductByAgency$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Distribution.update({
            price: price
          }, {
            where: {
              productCode: productCode,
              unit: unit,
              type: type
            }
          }));

        case 3:
          _context2.next = 9;
          break;

        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          throw new Error('Failed to update product');

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

module.exports = {
  deleteProductByAgency: deleteProductByAgency,
  updateProductByAgency: updateProductByAgency
};