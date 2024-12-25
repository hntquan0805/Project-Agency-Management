"use strict";

var _require = require('../models/distribution'),
    Distribution = _require.Distribution;

var _require2 = require('../models/inventory'),
    Inventory = _require2.Inventory;

var getProductsByAgency = function getProductsByAgency(type) {
  var products, result;
  return regeneratorRuntime.async(function getProductsByAgency$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Distribution.findAll({
            where: {
              type: type
            },
            attributes: ['productCode', 'unit', 'price'],
            include: [{
              model: Inventory,
              attributes: ['productName', 'quantityInStock']
            }]
          }));

        case 3:
          products = _context.sent;
          result = products.map(function (product) {
            return {
              productCode: product.productCode,
              productName: product.inventory ? products.inventory.productName : null,
              unit: product.unit,
              price: product.price,
              stock: product.inventory ? product.inventory.quantityInStock : 0
            };
          });
          return _context.abrupt("return", result);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching products:', _context.t0);
          throw _context.t0;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

module.exports = {
  getProductsByAgency: getProductsByAgency
};