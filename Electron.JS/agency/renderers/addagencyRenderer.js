document.getElementById('add-agency').addEventListener('click', async function(event) {
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
        const popup = document.getElementById('fail-pop-up');
        const popupMessage = document.getElementById('popup-message');
        if (result.success) {
            popupMessage.innerHTML = 'Agency has been successfully added!';
            showPopup(popup);
            document.querySelector('form').reset();
            updateAgencyTable(result.agencies);
        } else {
            popupMessage.innerHTML = `Failed to add agency: ${result.message}`;
            showPopup(popup);
        }
    }).catch((error) => {
        console.error('Error in frontend:', error);
        alert(`An error occurred: ${error.message}`);
    });
});

function showPopup(popup) {
    popup.style.display = 'block';
}

document.getElementById('close-pop-up-button').addEventListener('click', () => {
    document.getElementById('fail-pop-up').style.display = 'none'; // Ẩn popup khi đóng
});

function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
}

function updateAgencyTable(agencies) {
    const tableBody = document.querySelector('.table-agent tbody');
    tableBody.innerHTML = '';
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
        `;
        tableBody.appendChild(row);
    });
}
