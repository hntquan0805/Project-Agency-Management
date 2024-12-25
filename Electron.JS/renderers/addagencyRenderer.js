document.getElementById('add-agency').addEventListener('click', async function(event) {
    console.log('Button clicked!');
    event.preventDefault();

    const agencyData = {
        name: document.getElementById('agentName').value,
        phone: document.getElementById('phoneNumber').value,
        email: document.getElementById('email').value,
        type: document.getElementById('type').value,
        address: document.getElementById('address').value,
        onboardDate: document.getElementById('receptionDate').value,
        district: document.getElementById('district').value
    };

    window.api.addAgency(agencyData).then((result) => {

        if (result.success) {
            alert('Đại lý đã được thêm thành công!');
            document.querySelector('form').reset();
            
            // Cập nhật bảng sau khi thêm đại lý mới
            updateAgencyTable(result.agencies);
        } else {
            alert(`Thêm đại lý thất bại: ${result.message}`);
        }
    }).catch((error) => {
        console.error('Error in frontend:', error);
        alert(`Đã xảy ra lỗi: ${error.message}`);
    });
});

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function updateAgencyTable(agencies) {
    const tableBody = document.querySelector('.table-agent tbody');
    tableBody.innerHTML = ''; // Xóa các hàng cũ
    console.log(agencies);
    agencies.forEach((agency, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${agency.dataValues.name}</td>
            <td>${agency.dataValues.type}</td>
            <td>${agency.dataValues.address}</td>
            <td>${agency.dataValues.district}</td>
            <td>${formatDate(agency.dataValues.onboardDate)}</td>
            <td>${agency.dataValues.phone}</td>
            <td>${agency.dataValues.email}</td>
            <th><button class="fix-button"><i class="fa-solid fa-pen"></i></button></th>
            <th><button class="delete-button"><i class="fa-solid fa-trash"></i></button></th>
        `;
        tableBody.appendChild(row);
    });
}