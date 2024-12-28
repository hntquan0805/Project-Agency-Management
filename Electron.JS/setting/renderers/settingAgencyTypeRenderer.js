document.getElementById('agency-type-1').addEventListener('click', async function(event) {
    event.preventDefault();

    // Get data from the form
    const updateData = {
        agencyType: document.getElementById('agencyType').value,
        inputMaxGoodsPerBill: document.getElementById('inputMaxGoodsPerBill').value,
        inputMaximumDebt: document.getElementById('inputMaximumDebt').value
    };    

    // Send data to the backend via `window.api`
    window.api.updateAgencyTypeSettings(updateData).then((result) => {
        if (result.success) {
            alert('Update successful!');
            
            // Perform necessary actions after update
            console.log('Updated settings:', result.updatedSettings);
        } else {
            alert(result.message);
        }
    }).catch((error) => {
        console.error('Error in frontend:', error);
        alert(`An error occurred: ${error.message}`);
    });
});
