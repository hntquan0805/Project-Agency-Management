document.addEventListener('DOMContentLoaded', async () => {
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
    }
});
