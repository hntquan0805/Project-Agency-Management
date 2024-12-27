"use strict";

document.getElementById('agency-type-1').addEventListener('click', function _callee(event) {
  var updateData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          event.preventDefault();
          updateData = {
            agencyType: document.getElementById('agencyType').value,
            inputMaxGoodsPerBill: document.getElementById('inputMaxGoodsPerBill').value,
            inputMaximumDebt: document.getElementById('inputMaximumDebt').value
          };
          window.api.updateAgencyTypeSettings(updateData).then(function (result) {
            if (result.success) {
              alert('Update successful!');
              console.log('Updated settings:', result.updatedSettings);
            } else {
              alert(result.message);
            }
          })["catch"](function (error) {
            console.error('Error in frontend:', error);
            alert("An error occurred: ".concat(error.message));
          });

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});