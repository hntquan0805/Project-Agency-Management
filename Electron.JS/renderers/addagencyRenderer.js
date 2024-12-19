document.querySelector('addButton').addEventListener('click', async function(event) {
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

    try {
        const result = await window.api.addAgency(agencyData);

        if (result.success) {
            alert('Đại lý đã được thêm thành công!');
            document.querySelector('form').reset();
        } else {
            alert(`Thêm đại lý thất bại: ${result.message}`);
        }
    } catch (error) {
        alert(`Đã xảy ra lỗi: ${error.message}`);
    }
});
