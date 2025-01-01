document.addEventListener('DOMContentLoaded', async () => {
try {
    const popup = document.getElementById('fail-pop-up');
    popup.style.display = 'none';
    const agencyTypes = await window.api.getAgencyTypes();

    const agencyTypeSelect = document.getElementById('type');
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
try {
    const agencyTableBody = document.querySelector('.table-agent tbody');
    const agencies = await window.api.getAgencyData();

    if (agencies.length > 0) {
    agencyTableBody.innerHTML = '';
    agencies.forEach((agency, index) => {
        const agencyData = agency.dataValues;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${agencyData.name}</td>
        <td>${agencyData.type}</td>
        <td>${agencyData.address}</td>
        <td>${agencyData.district}</td>
        <td>${new Date(agencyData.onboardDate).toLocaleDateString()}</td>
        <td>${agencyData.phone}</td>
        <td>${agencyData.email}</td>
        `;
        agencyTableBody.appendChild(row);
    });
    } else {
    console.log('No agencies found');
    }
} catch (error) {
    console.error('Error loading agency data:', error);
}
});
