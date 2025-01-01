document.getElementById('agency-type-1').addEventListener('click', async function(event) {
    event.preventDefault();
    const updateData = {
        agencyType: document.getElementById('agencyType').value,
        inputMaxGoodsPerBill: document.getElementById('inputMaxGoodsPerBill').value,
        inputMaximumDebt: document.getElementById('inputMaximumDebt').value
    };    

    window.api.updateAgencyTypeSettings(updateData).then((result) => {
        if (result.success) {
            const popupMessageElement = document.getElementById('popupMessage');
            const failurePopup = document.getElementById('failurePopup');

            popupMessageElement.innerHTML = 'Updated settings successfully!';

            failurePopup.style.display = 'block';

            document.getElementById('closeFailurePopUpButton').addEventListener('click', () => {
                const failurePopup = document.getElementById('failurePopup');
                failurePopup.style.display = 'none';
            });
            console.log('Updated settings:', result.updatedSettings);
        } else {
            const popupMessageElement = document.getElementById('popupMessage');
            const failurePopup = document.getElementById('failurePopup');

            popupMessageElement.innerHTML = 'Updating settings failed!';

            failurePopup.style.display = 'block';

            document.getElementById('closeFailurePopUpButton').addEventListener('click', () => {
                const failurePopup = document.getElementById('failurePopup');
                failurePopup.style.display = 'none';
            });
        }
    }).catch((error) => {
        console.error('Error in frontend:', error);
        alert(`An error occurred: ${error.message}`);
    });
});
