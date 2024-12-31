document.addEventListener('DOMContentLoaded', () => {
    const accountType = sessionStorage.getItem('account-position');
    console.log(accountType);
    const setting = document.getElementById('setting');

    if (accountType === 'Staff') {
        setting.remove();
    }
    console.log('vo remove roi ne!')
  });