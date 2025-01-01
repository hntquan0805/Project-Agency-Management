document.addEventListener('DOMContentLoaded', () => {
    const accountType = sessionStorage.getItem('account-position');
    const setting = document.getElementById('setting');

    if (accountType === 'Staff') {
        setting.classList.add('disabled');
    }
});