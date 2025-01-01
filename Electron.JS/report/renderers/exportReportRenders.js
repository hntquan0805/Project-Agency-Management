document.querySelector('.export-button').addEventListener('click', async function () {
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const delivery_note = await window.api.searchDeliveryNotesByDate({ month, year });
    const table = await window.api.countNoteByAgency(delivery_note);
    const table_propor = await window.api.calculateProportion(table);
    let serial_1 = 1;

    const salesReport = document.getElementById('salesReport');
    salesReport.style.display = 'block';

    const resultsTable = document.getElementById('results');
    resultsTable.innerHTML = '';
    for (const agencyCode in table_propor) {
          const note = table_propor[agencyCode];
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${serial_1++}</td>
            <td>${note.name || 'N/A'}</td>
            <td>${note.count || 0}</td>
            <td>${note.totalPrice || 0}</td>
            <td>${note.proportion}%</td>
            <td><button class="fix-button btn btn-sm"><i class="bi bi-pencil"></i></button></td>
            <td><button class="delete-button btn btn-sm"><i class="bi bi-trash3"></i></button></td>
          `;
          resultsTable.appendChild(row);
    }
    const save_table_propor = await window.api.saveRevenueReport(month, year, table_propor);

    const table_2 = await window.api.countNoteByAgency(delivery_note);
    const table_debt = await window.api.renderDebtTable(month, year, table_2);
    let serial_2 = 1;

    const agentDebtReport = document.getElementById('agentDebtReport');
    agentDebtReport.style.display = 'block';

    const resultsDebt = document.getElementById('resultsDebt');
    resultsDebt.innerHTML = '';
    for (const agencyCode in table_debt) {
        const note = table_debt[agencyCode];
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${serial_2++}</td>
          <td>${note.name || 'N/A'}</td>
          <td>${note.initialDebt || 0}</td>
          <td>${note.incurredCost || 0}</td>
          <td>${note.finalDebt}</td>
          <td><button class="fix-button btn btn-sm"><i class="bi bi-pencil"></i></button></td>
          <td><button class="delete-button btn btn-sm"><i class="bi bi-trash3"></i></button></td>
        `;
        resultsDebt.appendChild(row);
    }

    if (table_debt.success === false) {
        console.error("Failed to render debt table.");
    return; // Không tiếp tục thực hiện đoạn mã sau
    }
  const response = await window.api.saveDebtHistory(month, year, table_debt);
});

document.addEventListener("DOMContentLoaded", () => {
    const downloadButton = document.querySelector(".download-button");
    const modal = document.getElementById("downloadModal");
    const closeModal = document.querySelector(".close-btn");
    const confirmDownload = document.getElementById("downloadConfirm");
    const fileNameInput = document.getElementById("fileName");
    const fileTypeSelect = document.getElementById("fileType");

    let selectedMonth = document.getElementById("month").value;
    let selectedYear = document.getElementById("year").value;

    downloadButton.addEventListener("click", () => {
        // Update file name based on the table
        const isAgentDebt = document.querySelector("#agentDebtReport").style.display !== "none";
        const baseName ="SaleReport";
        fileNameInput.value = `${baseName} ${selectedMonth}/${selectedYear}`;
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    confirmDownload.addEventListener("click", () => {
        const fileName = fileNameInput.value;
        const fileType = fileTypeSelect.value;
        modal.style.display = "none";

        // Fake download logic
        const blob = new Blob(["File content"], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.${fileType}`;
        link.click();
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});