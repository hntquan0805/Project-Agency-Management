"use strict";

document.addEventListener('DOMContentLoaded', function _callee() {
  var agencyTypes, agencyTypeSelect;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(window.api.getAgencyTypes());

        case 3:
          agencyTypes = _context.sent;
          console.log(agencyTypes); // Get the select element from the HTML

          agencyTypeSelect = document.getElementById('agencyType');
          agencyTypeSelect.innerHTML = ''; // Clear previous options in select
          // Add options to the select

          agencyTypes.forEach(function (type) {
            var option = document.createElement('option');
            option.value = type; // The value is just the type

            option.textContent = type; // Display the type value

            agencyTypeSelect.appendChild(option);
          });
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching agency types:', _context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
});