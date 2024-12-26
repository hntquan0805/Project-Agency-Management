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
            }],
            raw: true
          }));

        case 3:
          products = _context.sent;
          result = products.map(function (product) {
            return {
              productCode: product.productCode,
              productName: product['Inventory.productName'] || null,
              unit: product.unit,
              price: product.price,
              stock: product['Inventory.quantityInStock'] || 0
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

var getProductsByCode = function getProductsByCode(productCode, unit, type) {
  var product;
  return regeneratorRuntime.async(function getProductsByCode$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Distribution.findOne({
            where: {
              type: type,
              productCode: productCode,
              unit: unit
            },
            attributes: ['productCode', 'unit', 'price'],
            include: [{
              model: Inventory,
              attributes: ['productName', 'quantityInStock']
            }],
            raw: true
          }));

        case 3:
          product = _context2.sent;

          if (product) {
            _context2.next = 6;
            break;
          }

          throw new Error('Product not found');

        case 6:
          return _context2.abrupt("return", {
            productCode: product.productCode,
            productName: product['Inventory.productName'] || null,
            unit: product.unit,
            price: product.price,
            stock: product['Inventory.quantityInStock'] || 0
          });

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error('Error fetching products:', _context2.t0);
          throw _context2.t0;

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports = {
  getProductsByAgency: getProductsByAgency,
  getProductsByCode: getProductsByCode
};