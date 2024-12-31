class Information {
    static removeSetting = () => {
        const accountType = sessionStorage.getItem('account-position');

        const setting = document.getElementById('setting');

        if (accountType === '1') {
            setting.remove();
        }
    }
}  

module.exports = Information;