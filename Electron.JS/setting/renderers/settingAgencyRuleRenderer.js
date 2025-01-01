document.getElementById('agency-rule-1').addEventListener('click', async function(event) {
    event.preventDefault();
    const updateData = {
        numAgentTypes: document.getElementById('inputAgencyTypes').value,
        maxAgentsInDistrict: document.getElementById('inputMaxAgenciesPerDist').value,
        currencyUnit: document.getElementById('currencyUnit').value
    };    

    window.api.updateSettings(updateData).then(async (result) => {
        if (result.success) {
            alert('Update successful!');
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
            alert(result.message);
        }
    }).catch((error) => {
        console.error('Error in frontend:', error);
        alert(`An error occurred: ${error.message}`);
    });
});
