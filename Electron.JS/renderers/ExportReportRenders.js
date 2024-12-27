document.querySelector('.export-button').addEventListener('click', async function () {
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const delivery_note = await window.api.searchDeliveryNotesByDate({ month, year });
    const table = await window.api.countNoteByAgency(delivery_note);



    // Hiển thị bảng sales-report
    const salesReport = document.getElementById('salesReport');
    salesReport.style.display = 'block';

    const resultsTable = document.getElementById('results');
    console.log(table);
    resultsTable.innerHTML = '';
    for (const agencyCode in table) {
          const note = table[agencyCode]; // Đối tượng tương ứng với agencyCode
          console.log(note);
          const row = document.createElement('tr');
          row.innerHTML = `
            <th>${agencyCode}</th>
            <th>${note || 'N/A'}</th>
            <th>${note.count}</th>
          `;
          resultsTable.appendChild(row);
    }
    const agentDebtReport = document.getElementById('agentDebtReport');
    agentDebtReport.style.display = 'block';

    const resultsDebt = document.getElementById('resultsDebt');
    resultsDebt.innerHTML = `
        <tr>
            <td>1</td>
            <td>Agent C</td>
            <td>$1000</td>
            <td>$200</td>
            <td>$1200</td>
            <td><button class="fix-button btn btn-sm"><i class="bi bi-pencil"></i></button></td>
            <td><button class="delete-button btn btn-sm"><i class="bi bi-trash3"></i></button></td>
        </tr>
        <tr>
            <td>2</td>
            <td>Agent D</td>
            <td>$800</td>
            <td>$100</td>
            <td>$900</td>
            <td><button class="fix-button btn btn-sm"><i class="bi bi-pencil"></i></button></td>
            <td><button class="delete-button btn btn-sm"><i class="bi bi-trash3"></i></button></td>
        </tr>
    `;
});




