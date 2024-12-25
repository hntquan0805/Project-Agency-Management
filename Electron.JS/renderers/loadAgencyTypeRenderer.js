document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Send request to the main process to get the list of agency types
        const agencyTypes = await window.api.getAgencyTypes();
        console.log(agencyTypes);
        // Get the select element from the HTML
        const agencyTypeSelect = document.getElementById('agencyType');
        agencyTypeSelect.innerHTML = ''; // Clear previous options in select
        // Add options to the select
        agencyTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type; // The value is just the type
            option.textContent = type; // Display the type value
            agencyTypeSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching agency types:', error);
    }
});
