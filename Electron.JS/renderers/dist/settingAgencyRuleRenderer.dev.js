"use strict";

document.getElementById('agency-rule-1').addEventListener('click', function _callee2(event) {
  var updateData;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          event.preventDefault(); // Get data from the form

          updateData = {
            numAgentTypes: document.getElementById('inputAgencyTypes').value,
            maxAgentsInDistrict: document.getElementById('inputMaxAgenciesPerDist').value,
            currencyUnit: document.getElementById('currencyUnit').value
          }; // Send data to the backend via `window.api`

          window.api.updateSettings(updateData).then(function _callee(result) {
            var agencyTypes, agencyTypeSelect, typeSelect;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!result.success) {
                      _context.next = 22;
                      break;
                    }

                    alert('Update successful!'); // Perform necessary actions after update

                    console.log('Updated settings:', result.updatedSettings);
                    _context.prev = 3;
                    _context.next = 6;
                    return regeneratorRuntime.awrap(window.api.getAgencyTypes());

                  case 6:
                    agencyTypes = _context.sent;
                    console.log('Agency Types:', agencyTypes); // Get the select element from the HTML

                    agencyTypeSelect = document.getElementById('agencyType');
                    agencyTypeSelect.innerHTML = ''; // Clear old options in select
                    // Add options to select

                    agencyTypes.forEach(function (type) {
                      var option = document.createElement('option');
                      option.value = type; // The value is the agency type

                      option.textContent = type; // Display the agency type

                      agencyTypeSelect.appendChild(option);
                    });
                    typeSelect = document.getElementById('type');
                    typeSelect.innerHTML = ''; // Clear old options in select
                    // Add options to type select

                    agencyTypes.forEach(function (type) {
                      var option = document.createElement('option');
                      option.value = type; // The value is the agency type

                      option.textContent = type; // Display the agency type

                      typeSelect.appendChild(option);
                    });
                    _context.next = 20;
                    break;

                  case 16:
                    _context.prev = 16;
                    _context.t0 = _context["catch"](3);
                    console.error('Error fetching agency types:', _context.t0);
                    alert('An error occurred while fetching agency types');

                  case 20:
                    _context.next = 23;
                    break;

                  case 22:
                    alert(result.message);

                  case 23:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[3, 16]]);
          })["catch"](function (error) {
            console.error('Error in frontend:', error);
            alert("An error occurred: ".concat(error.message));
          });

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});