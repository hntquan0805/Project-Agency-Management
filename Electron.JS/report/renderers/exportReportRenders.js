document.querySelector('.export-button').addEventListener('click', function () {
    // Hiển thị bảng sales-report
    const salesReport = document.getElementById('salesReport');
    salesReport.style.display = 'block';

    // Thêm dữ liệu mẫu vào bảng (tùy chỉnh theo yêu cầu thực tế)
    const results = document.getElementById('results');
    results.innerHTML = `
        <tr>
            <td>1</td>
            <td>Agent A</td>
            <td>5</td>
            <td>$500</td>
            <td>25%</td>
            <td><button class="fix-button btn btn-sm"><i class="bi bi-pencil"></i></button></td>
            <td><button class="delete-button btn btn-sm"><i class="bi bi-trash3"></i></button></td>
        </tr>
        <tr>
            <td>2</td>
            <td>Agent B</td>
            <td>3</td>
            <td>$300</td>
            <td>15%</td>
            <td><button class="fix-button btn btn-sm"><i class="bi bi-pencil"></i></button></td>
            <td><button class="delete-button btn btn-sm"><i class="bi bi-trash3"></i></button></td>
        </tr>
    `;

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
