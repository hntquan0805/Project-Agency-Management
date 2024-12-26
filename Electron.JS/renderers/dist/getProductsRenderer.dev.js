"use strict";

document.addEventListener('DOMContentLoaded', function _callee4(e) {
  var type, productsList, editModal, editForm, editCancel, loadProducts;
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          loadProducts = function _ref() {
            var products;
            return regeneratorRuntime.async(function loadProducts$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return regeneratorRuntime.awrap(window.api.getProductsByAgency(type.value));

                  case 2:
                    products = _context4.sent;
                    productsList.innerHTML = '';
                    products.forEach(function (product) {
                      var row = document.createElement('tr');
                      row.innerHTML = "\n                <td>".concat(product.productCode, "</td>\n                <td>").concat(product.productName || 'N/A', "</td>\n                <td>").concat(product.unit, "</td>\n                <td>").concat(product.price, "</td>\n                <td>").concat(product.stock, "</td>\n                <td><button data-type=\"").concat(type.value, "\" data-id=\"").concat(product.productCode, "\" data-unit=\"").concat(product.unit, "\" class=\"edit-button\"><i class=\"fa-regular fa-pen-to-square\"></i></button></td>\n                <td><button data-type=\"").concat(type.value, "\" data-id=\"").concat(product.productCode, "\" data-unit=\"").concat(product.unit, "\" class=\"delete-button\"><i class=\"fa-regular fa-trash-can\"></i></button></td>\n            ");
                      productsList.appendChild(row);
                    });
                    document.querySelectorAll('.delete-button').forEach(function (button) {
                      button.addEventListener('click', function _callee(event) {
                        var productCode, unit, _type;

                        return regeneratorRuntime.async(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                if (!confirm('Are you sure you want to delete this product?')) {
                                  _context.next = 7;
                                  break;
                                }

                                productCode = button.getAttribute('data-id');
                                unit = button.getAttribute('data-unit');
                                _type = button.getAttribute('data-type');
                                _context.next = 6;
                                return regeneratorRuntime.awrap(window.api.deleteProductByAgnecy(productCode, unit, _type));

                              case 6:
                                loadProducts();

                              case 7:
                              case "end":
                                return _context.stop();
                            }
                          }
                        });
                      });
                    });
                    document.querySelectorAll('.edit-button').forEach(function (button) {
                      button.addEventListener('click', function _callee3(event) {
                        var productCode, unit, type, product;
                        return regeneratorRuntime.async(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                productCode = button.getAttribute('data-id');
                                unit = button.getAttribute('data-unit');
                                type = button.getAttribute('data-type');
                                _context3.next = 5;
                                return regeneratorRuntime.awrap(window.api.getProductsByCode(productCode, unit, type));

                              case 5:
                                product = _context3.sent;
                                console.log(product);
                                document.getElementById('goods-code').value = product.productCode;
                                document.getElementById('goods-name').value = product.productName;
                                document.getElementById('goods-calculation-unit').value = product.unit;
                                document.getElementById('goods-price').value = product.price;
                                document.getElementById('goods-stock-quantity').value = product.stock;
                                overlay.style.display = 'block';
                                editModal.style.display = 'block';
                                editForm.addEventListener('submit', function _callee2(event) {
                                  var price, productCode, unit, type;
                                  return regeneratorRuntime.async(function _callee2$(_context2) {
                                    while (1) {
                                      switch (_context2.prev = _context2.next) {
                                        case 0:
                                          price = parseFloat(document.getElementById('edit-price').value);
                                          productCode = button.getAttribute('data-id');
                                          unit = event.target.getAttribute('data-unit');
                                          type = event.target.getAttribute('data-type');
                                          _context2.next = 6;
                                          return regeneratorRuntime.awrap(window.api.updateProduct(productCode, unit, type, price));

                                        case 6:
                                          editModal.style.display = 'none';
                                          overlay.style.display = 'none';
                                          loadProducts();

                                        case 9:
                                        case "end":
                                          return _context2.stop();
                                      }
                                    }
                                  });
                                });
                                editCancel.addEventListener('click', function () {
                                  editModal.style.display = 'none';
                                  overlay.style.display = 'none';
                                });

                              case 16:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        });
                      });
                    });

                  case 7:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          };

          e.preventDefault();
          type = document.getElementById('type');
          productsList = document.getElementById('products-list');
          editModal = document.getElementById('edit-modal');
          editForm = document.getElementById('edit-form');
          editCancel = document.getElementById('close-pop-up-button');
          loadProducts();

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
});