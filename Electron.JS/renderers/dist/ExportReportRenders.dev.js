"use strict";

document.querySelector('.export-button').addEventListener('click', function _callee() {
  var month, year, delivery_note, table, table_propor, serial_1, salesReport, resultsTable, agencyCode, note, row, save_table_propor, table_2, table_debt, serial_2, agentDebtReport, resultsDebt, _agencyCode, _note, _row, response;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          month = document.getElementById('month').value;
          year = document.getElementById('year').value;
          _context.next = 4;
          return regeneratorRuntime.awrap(window.api.searchDeliveryNotesByDate({
            month: month,
            year: year
          }));

        case 4:
          delivery_note = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(window.api.countNoteByAgency(delivery_note));

        case 7:
          table = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(window.api.calculateProportion(table));

        case 10:
          table_propor = _context.sent;
          serial_1 = 1;
          salesReport = document.getElementById('salesReport');
          salesReport.style.display = 'block';
          resultsTable = document.getElementById('results');
          resultsTable.innerHTML = '';

          for (agencyCode in table_propor) {
            note = table_propor[agencyCode];
            row = document.createElement('tr');
            row.innerHTML = "\n            <td>".concat(serial_1++, "</td>\n            <td>").concat(note.name || 'N/A', "</td>\n            <td>").concat(note.count || 0, "</td>\n            <td>").concat(note.totalPrice || 0, "</td>\n            <td>").concat(note.proportion, "%</td>\n            <td><button class=\"fix-button btn btn-sm\"><i class=\"bi bi-pencil\"></i></button></td>\n            <td><button class=\"delete-button btn btn-sm\"><i class=\"bi bi-trash3\"></i></button></td>\n          ");
            resultsTable.appendChild(row);
          }

          _context.next = 19;
          return regeneratorRuntime.awrap(window.api.saveRevenueReport(month, year, table_propor));

        case 19:
          save_table_propor = _context.sent;
          _context.next = 22;
          return regeneratorRuntime.awrap(window.api.countNoteByAgency(delivery_note));

        case 22:
          table_2 = _context.sent;
          _context.next = 25;
          return regeneratorRuntime.awrap(window.api.renderDebtTable(month, year, table_2));

        case 25:
          table_debt = _context.sent;
          serial_2 = 1;
          console.log(table_debt);
          agentDebtReport = document.getElementById('agentDebtReport');
          agentDebtReport.style.display = 'block';
          resultsDebt = document.getElementById('resultsDebt');
          resultsDebt.innerHTML = '';

          for (_agencyCode in table_debt) {
            _note = table_debt[_agencyCode];
            _row = document.createElement('tr');
            _row.innerHTML = "\n          <td>".concat(serial_2++, "</td>\n          <td>").concat(_note.name || 'N/A', "</td>\n          <td>").concat(_note.initialDebt || 0, "</td>\n          <td>").concat(_note.incurredCost || 0, "</td>\n          <td>").concat(_note.finalDebt, "</td>\n          <td><button class=\"fix-button btn btn-sm\"><i class=\"bi bi-pencil\"></i></button></td>\n          <td><button class=\"delete-button btn btn-sm\"><i class=\"bi bi-trash3\"></i></button></td>\n        ");
            resultsDebt.appendChild(_row);
          }

          _context.next = 35;
          return regeneratorRuntime.awrap(window.api.saveDebtHistory(month, year, table_debt));

        case 35:
          response = _context.sent;

        case 36:
        case "end":
          return _context.stop();
      }
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var downloadButton = document.querySelector(".download-button");
  var modal = document.getElementById("downloadModal");
  var closeModal = document.querySelector(".close-btn");
  var confirmDownload = document.getElementById("downloadConfirm");
  var fileNameInput = document.getElementById("fileName");
  var fileTypeSelect = document.getElementById("fileType");
  var selectedMonth = document.getElementById("month").value;
  var selectedYear = document.getElementById("year").value;
  downloadButton.addEventListener("click", function () {
    // Update file name based on the table
    var isAgentDebt = document.querySelector("#agentDebtReport").style.display !== "none";
    var baseName = "SaleReport";
    fileNameInput.value = "".concat(baseName, " ").concat(selectedMonth, "/").concat(selectedYear);
    modal.style.display = "block";
  });
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });
  confirmDownload.addEventListener("click", function () {
    var fileName = fileNameInput.value;
    var fileType = fileTypeSelect.value;
    modal.style.display = "none"; // Fake download logic

    var blob = new Blob(["File content"], {
      type: "text/plain"
    });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "".concat(fileName, ".").concat(fileType);
    link.click();
  });
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});