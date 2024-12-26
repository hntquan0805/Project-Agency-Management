"use strict";

document.addEventListener('DOMContentLoaded', function _callee() {
  var agencyTypes, agencyTypeSelect, typeSelect;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(window.api.getAgencyTypes());

        case 3:
          agencyTypes = _context.sent;
          // Get the select element from the HTML
          agencyTypeSelect = document.getElementById('agencyType');
          agencyTypeSelect.innerHTML = ''; // Clear previous options in select
          // Add options to the select

          agencyTypes.forEach(function (type) {
            var option = document.createElement('option');
            option.value = type; // The value is just the type

            option.textContent = type; // Display the type value

            agencyTypeSelect.appendChild(option);
          });
          typeSelect = document.getElementById('type');
          typeSelect.innerHTML = ''; // Xóa các option cũ trong select

          agencyTypes.forEach(function (type) {
            var option = document.createElement('option');
            option.value = type; // The value is just the type

            option.textContent = type; // Display the type value

            typeSelect.appendChild(option);
          });
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching agency types:', _context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
});