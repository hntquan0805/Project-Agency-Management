document.getElementById('agency-rule-1').addEventListener('click', async function(event) {
    event.preventDefault();

    // Lấy dữ liệu từ form
    const updateData = {
        numAgentTypes: document.getElementById('inputNumAgentTypes').value,
        maxAgentsInDistrict: document.getElementById('inputMaxAgentsInDist').value,
        currencyUnit: document.getElementById('currencyUnit').value
    };

    // Gửi dữ liệu đến backend qua `window.api`
    window.api.updateSettings(updateData).then((result) => {
        if (result.success) {
            alert('Cập nhật thành công!');
            
            // Thực hiện các hành động cần thiết sau khi cập nhật
            console.log('Updated settings:', result.updatedSettings);
        } else {
            alert(result.message);
        }
    }).catch((error) => {
        console.error('Error in frontend:', error);
        alert(`Đã xảy ra lỗi: ${error.message}`);
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Gửi yêu cầu tới main process để lấy danh sách loại đại lý
        const agencyTypes = await window.electron.getAgencyTypes();
        
        // Lấy phần tử select từ HTML
        const agentTypeSelect = document.getElementById('agentType');
        agentTypeSelect.innerHTML = ''; // Xóa các lựa chọn cũ trong select
        // Thêm các lựa chọn vào select
        agencyTypes.forEach(agencyType => {
            const option = document.createElement('option');
            option.value = agencyType.type; // Giả sử 'type' là thuộc tính của AgencyType
            option.textContent = agencyType.type; // Hiển thị type trong dropdown
            agentTypeSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Lỗi khi lấy loại đại lý:', error);
    }
});


