"use strict";

document.getElementById('create-received-note').addEventListener('click', function _callee(event) {
  var agencyName, address, phoneNumber, email, date, amount, formData, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          event.preventDefault();
          agencyName = document.getElementById("agentName").value;
          address = document.getElementById("address").value;
          phoneNumber = document.getElementById("phoneNumber").value;
          email = document.getElementById("email").value;
          date = document.getElementById("date").value;
          amount = document.getElementById("amount").value;
          formData = {
            agencyName: agencyName,
            address: address,
            phoneNumber: phoneNumber,
            email: email,
            date: date,
            amount: amount
          };
          _context.next = 10;
          return regeneratorRuntime.awrap(window.api.saveGoodsReceivedNote(formData));

        case 10:
          result = _context.sent;

          // Kiểm tra nếu việc lưu thành công
          if (result.success) {
            // Cập nhật thông tin trong phần tử .result
            document.querySelector(".result .result-container h3").textContent = "GOODS RECEIVED NOTE";
            document.querySelector(".result .result-container p span:nth-child(1)").textContent = agencyName; // Supplier Name

            document.querySelector(".result .result-container p span:nth-child(2)").textContent = email; // Email

            document.querySelector(".result .result-container p span:nth-child(3)").textContent = phoneNumber; // Phone Number

            document.querySelector(".result .result-container p span:nth-child(4)").textContent = address; // Address

            document.querySelector(".result .result-container p span:nth-child(5)").textContent = amount + " VND"; // Amount Paid

            document.querySelector(".result .result-container p span:nth-child(6)").textContent = date; // Date

            document.querySelector(".result .result-container p span:nth-child(7)").textContent = 'Admin'; // Received By
            // Hiển thị phần tử .result

            document.querySelector(".result").style.display = 'block'; // Thêm sự kiện cho nút Close

            document.querySelector(".closeButton").addEventListener('click', function () {
              document.querySelector(".result").style.display = 'none';
            }); // Thêm sự kiện cho nút Print

            document.querySelector(".printButton").addEventListener('click', function () {
              window.print(); // In trang hiện tại
            });
          } else {
            alert(result.message); // Nếu không thành công, hiển thị thông báo lỗi
          }

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
});