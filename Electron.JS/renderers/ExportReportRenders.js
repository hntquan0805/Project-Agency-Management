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
