"use strict";

document.addEventListener('DOMContentLoaded', function _callee(e) {
  var type, products, productsList;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          e.preventDefault();
          type = document.getElementById('type').value;
          _context.next = 4;
          return regeneratorRuntime.awrap(window.api.getProductsByAgency(type));

        case 4:
          products = _context.sent;
          productsList = document.getElementById('products-list');
          productsList.innerHTML = '';
          products.forEach(function (product) {
            var row = document.createElement('tr');
            row.innerHTML = "\n            <td>".concat(product.productCode, "</td>\n            <td>").concat(product.productName || 'N/A', "</td>\n            <td>").concat(product.unit, "</td>\n            <td>").concat(product.price, "</td>\n            <td>").concat(product.stock, "</td>\n            <td><button class=\"btn btn-warning btn-sm\">Edit</button></td>\n            <td><button class=\"btn btn-danger btn-sm\">Delete</button></td>\n        ");
            productsList.appendChild(row);
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});