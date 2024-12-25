"use strict";

document.getElementById('agency-rule-1').addEventListener('click', function _callee(event) {
  var updateData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          event.preventDefault(); // Lấy dữ liệu từ form

          updateData = {
            numAgentTypes: document.getElementById('inputNumAgentTypes').value,
            maxAgentsInDistrict: document.getElementById('inputMaxAgentsInDist').value,
            currencyUnit: document.getElementById('currencyUnit').value
          }; // Gửi dữ liệu đến backend qua `window.api`

          window.api.updateSettings(updateData).then(function (result) {
            if (result.success) {
              alert('Cập nhật thành công!'); // Thực hiện các hành động cần thiết sau khi cập nhật

              console.log('Updated settings:', result.updatedSettings);
            } else {
              alert(result.message);
            }
          })["catch"](function (error) {
            console.error('Error in frontend:', error);
            alert("\u0110\xE3 x\u1EA3y ra l\u1ED7i: ".concat(error.message));
          });

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});
document.addEventListener('DOMContentLoaded', function _callee2() {
  var agencyTypes, agentTypeSelect;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(window.electron.getAgencyTypes());

        case 3:
          agencyTypes = _context2.sent;
          // Lấy phần tử select từ HTML
          agentTypeSelect = document.getElementById('agentType');
          agentTypeSelect.innerHTML = ''; // Xóa các lựa chọn cũ trong select
          // Thêm các lựa chọn vào select

          agencyTypes.forEach(function (agencyType) {
            var option = document.createElement('option');
            option.value = agencyType.type; // Giả sử 'type' là thuộc tính của AgencyType

            option.textContent = agencyType.type; // Hiển thị type trong dropdown

            agentTypeSelect.appendChild(option);
          });
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error('Lỗi khi lấy loại đại lý:', _context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
});