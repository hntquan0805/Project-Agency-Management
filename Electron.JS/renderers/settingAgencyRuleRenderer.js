document.getElementById('agency-rule-1').addEventListener('click', async function(event) {
    event.preventDefault();

    // Get data from the form
    const updateData = {
        numAgentTypes: document.getElementById('inputAgencyTypes').value,
        maxAgentsInDistrict: document.getElementById('inputMaxAgenciesPerDist').value,
        currencyUnit: document.getElementById('currencyUnit').value
    };    

    // Send data to the backend via `window.api`
    window.api.updateSettings(updateData).then(async (result) => {
        if (result.success) {
            alert('Update successful!');
            
            // Perform necessary actions after update
            console.log('Updated settings:', result.updatedSettings);
            try {
                // Call the `get-agency-types` function again to get the updated list of agency types
                const agencyTypes = await window.api.getAgencyTypes();
                console.log('Agency Types:', agencyTypes);
                // Get the select element from the HTML
                const agencyTypeSelect = document.getElementById('agencyType');
                agencyTypeSelect.innerHTML = ''; // Clear old options in select

                // Add options to select
                agencyTypes.forEach(type => {
                    const option = document.createElement('option');
                    option.value = type; // The value is the agency type
                    option.textContent = type; // Display the agency type
                    agencyTypeSelect.appendChild(option);
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
