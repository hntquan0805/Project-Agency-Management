document.getElementById('agency-rule-1').addEventListener('click', async function(event) {
    event.preventDefault();
    const updateData = {
        numAgentTypes: document.getElementById('inputAgencyTypes').value,
        maxAgentsInDistrict: document.getElementById('inputMaxAgenciesPerDist').value,
        currencyUnit: document.getElementById('currencyUnit').value
    };    

    window.api.updateSettings(updateData).then(async (result) => {
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
            try {
                const agencyTypes = await window.api.getAgencyTypes();

                const agencyTypeSelect = document.getElementById('agencyType');
                agencyTypeSelect.innerHTML = '';
                agencyTypes.forEach(type => {
                    const option = document.createElement('option');
                    option.value = type;
                    option.textContent = type;
                    agencyTypeSelect.appendChild(option);
                });

                const typeSelect = document.getElementById('type');
                typeSelect.innerHTML = '';

                agencyTypes.forEach(type => {
                    const option = document.createElement('option');
                    option.value = type;
                    option.textContent = type;
                    typeSelect.appendChild(option);
                });

            } catch (error) {
                console.error('Error fetching agency types:', error);
                alert('An error occurred while fetching agency types');
            }
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
