document.addEventListener('DOMContentLoaded', async () => {
    try {
        const agencyTypes = await window.api.getAgencyTypes();

        const agencyTypeSelect = document.getElementById('agency-type');
        agencyTypeSelect.innerHTML = '';
        agencyTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            agencyTypeSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching agency types:', error);
    }
});