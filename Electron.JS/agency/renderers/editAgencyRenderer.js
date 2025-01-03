document.getElementById('edit-agency-pop-up').addEventListener('submit', async function (e) {
    e.preventDefault();

    const agencyCode = document.getElementById('agency-serial').value;
    const agencyName = document.getElementById('agency-name').value;
    const agencyType = document.getElementById('agency-type').value;
    const agencyAddress = document.getElementById('agency-address').value;
    const agencyDistrict = document.getElementById('agency-district').value;
    const onboardDate = document.getElementById('reception-date').value;
    const agencyPhone = document.getElementById('agency-phone').value;
    const agencyEmail = document.getElementById('agency-email').value;
    const agencyDebt = document.getElementById('agency-debt').value;

    const updatedAgencyData = {
        agencyCode: agencyCode,
        agencyName: agencyName,
        agencyType: agencyType,
        agencyAddress: agencyAddress,
        agencyDistrict: agencyDistrict,
        onboardDate: onboardDate,
        agencyPhone: agencyPhone,
        agencyEmail: agencyEmail,
        agencyDebt: agencyDebt
    };

    try {
        const response = await window.api.updateAgency(updatedAgencyData);

        if (response.success) {
            document.getElementById('edit-agency-pop-up').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        } else {
            alert('Failed to update agency information. Please try again later.');
        }
    } catch (error) {
        console.error('Error updating agency:', error);
        alert('An error occurred. Please try again later.');
    }
});

document.getElementById('close-pop-up-button').addEventListener('click', function() {
    document.getElementById('edit-agency-pop-up').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});
