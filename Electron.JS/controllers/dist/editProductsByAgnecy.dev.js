"use strict";

var _require = require('../models/distribution'),
    Distribution = _require.Distribution;

var deleteProductByAgnecy = function deleteProductByAgnecy(productCode, unit) {
  var product;
  return regeneratorRuntime.async(function deleteProductByAgnecy$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          product = Distribution.findOne({
            where: {
              productCode: productCode,
              unit: unit
            }
          });
          _context.next = 4;
          return regeneratorRuntime.awrap(Distribution.destroy({
            where: {
              productCode: productCode,
              unit: unit
            }
          }));

        case 4:
          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          throw new Error('Failed to delete product');

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

module.exports = {
  deleteProductByAgnecy: deleteProductByAgnecy
};