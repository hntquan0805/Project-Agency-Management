document.getElementById('agency-type-1').addEventListener('click', async function(event) {
    event.preventDefault();
    const updateData = {
        agencyType: document.getElementById('agencyType').value,
        inputMaxGoodsPerBill: document.getElementById('inputMaxGoodsPerBill').value,
        inputMaximumDebt: document.getElementById('inputMaximumDebt').value
    };    

    window.api.updateAgencyTypeSettings(updateData).then((result) => {
        if (result.success) {
            alert('Update successful!');
            console.log('Updated settings:', result.updatedSettings);
        } else {
            alert(result.message);
        }
    }).catch((error) => {
        console.error('Error in frontend:', error);
        alert(`An error occurred: ${error.message}`);
    });
});
