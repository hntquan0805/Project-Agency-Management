"use strict";

document.querySelector('.export-button').addEventListener('click', function _callee() {
  var month, year, delivery_note, table, salesReport, resultsTable, agencyCode, note, row, agentDebtReport, resultsDebt;
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
          // Hiển thị bảng sales-report
          salesReport = document.getElementById('salesReport');
          salesReport.style.display = 'block';
          resultsTable = document.getElementById('results');
          console.log(table);
          resultsTable.innerHTML = '';

          for (agencyCode in table) {
            note = table[agencyCode]; // Đối tượng tương ứng với agencyCode

            console.log(note);
            row = document.createElement('tr');
            row.innerHTML = "\n            <th>".concat(agencyCode, "</th>\n            <th>").concat(note || 'N/A', "</th>\n            <th>").concat(note.count, "</th>\n          ");
            resultsTable.appendChild(row);
          }

          agentDebtReport = document.getElementById('agentDebtReport');
          agentDebtReport.style.display = 'block';
          resultsDebt = document.getElementById('resultsDebt');
          resultsDebt.innerHTML = "\n        <tr>\n            <td>1</td>\n            <td>Agent C</td>\n            <td>$1000</td>\n            <td>$200</td>\n            <td>$1200</td>\n            <td><button class=\"fix-button btn btn-sm\"><i class=\"bi bi-pencil\"></i></button></td>\n            <td><button class=\"delete-button btn btn-sm\"><i class=\"bi bi-trash3\"></i></button></td>\n        </tr>\n        <tr>\n            <td>2</td>\n            <td>Agent D</td>\n            <td>$800</td>\n            <td>$100</td>\n            <td>$900</td>\n            <td><button class=\"fix-button btn btn-sm\"><i class=\"bi bi-pencil\"></i></button></td>\n            <td><button class=\"delete-button btn btn-sm\"><i class=\"bi bi-trash3\"></i></button></td>\n        </tr>\n    ";

        case 18:
        case "end":
          return _context.stop();
      }
    }
  });
});