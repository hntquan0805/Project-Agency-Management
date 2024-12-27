"use strict";

document.getElementById('add-agency').addEventListener('click', function _callee(event) {
  var agencyData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('Button clicked!');
          event.preventDefault();
          agencyData = {
            name: document.getElementById('agentName').value,
            phone: document.getElementById('phoneNumber').value,
            email: document.getElementById('email').value,
            type: document.getElementById('type').value,
            address: document.getElementById('address').value,
            onboardDate: document.getElementById('receptionDate').value,
            district: document.getElementById('district').value
          };
          window.api.addAgency(agencyData).then(function (result) {
            if (result.success) {
              alert('Agency has been successfully added!');
              document.querySelector('form').reset();
              updateAgencyTable(result.agencies);
            } else {
              alert("Failed to add agency: ".concat(result.message));
            }
          })["catch"](function (error) {
            console.error('Error in frontend:', error);
            alert("An error occurred: ".concat(error.message));
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});

function formatDate(dateString) {
  var options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  };
  return new Date(dateString).toLocaleDateString('en-GB', options);
}

function updateAgencyTable(agencies) {
  var tableBody = document.querySelector('.table-agent tbody');
  tableBody.innerHTML = '';
  console.log(agencies);
  agencies.forEach(function (agency, index) {
    var row = document.createElement('tr');
    row.innerHTML = "\n            <td>".concat(index + 1, "</td>\n            <td>").concat(agency.dataValues.name, "</td>\n            <td>").concat(agency.dataValues.type, "</td>\n            <td>").concat(agency.dataValues.address, "</td>\n            <td>").concat(agency.dataValues.district, "</td>\n            <td>").concat(formatDate(agency.dataValues.onboardDate), "</td>\n            <td>").concat(agency.dataValues.phone, "</td>\n            <td>").concat(agency.dataValues.email, "</td>\n            <th><button class=\"fix-button\"><i class=\"fa-solid fa-pen\"></i></button></th>\n            <th><button class=\"delete-button\"><i class=\"fa-solid fa-trash\"></i></button></th>\n        ");
    tableBody.appendChild(row);
  });
}