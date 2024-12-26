"use strict";

function updateProductTable(products) {
  var productsList = document.getElementById('products-list');
  productsList.innerHTML = '';
  products.forEach(function (product) {
    var row = document.createElement('tr');
    row.innerHTML = "\n            <td>".concat(product.productCode, "</td>\n            <td>").concat(product.productName || 'N/A', "</td>\n            <td>").concat(product.unit, "</td>\n            <td>").concat(product.price, "</td>\n            <td>").concat(product.stock, "</td>\n            <td><button class=\"btn btn-warning btn-sm\">Edit</button></td>\n            <td><button class=\"btn btn-danger btn-sm\">Delete</button></td>\n        ");
    productsList.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', function _callee2(e) {
  var typeSelect, type, products;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          e.preventDefault();
          typeSelect = document.getElementById('type');
          type = typeSelect.value;
          _context2.next = 5;
          return regeneratorRuntime.awrap(window.api.getProductsByAgency(type));

        case 5:
          products = _context2.sent;
          updateProductTable(products);
          typeSelect.addEventListener('change', function _callee(event) {
            var selectedType, products_n;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    console.log("Thay đổi giá trị select");
                    selectedType = event.target.value;
                    _context.next = 4;
                    return regeneratorRuntime.awrap(window.api.getProductsByAgency(selectedType));

                  case 4:
                    products_n = _context.sent;
                    updateProductTable(products_n);

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            });
          });

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
});