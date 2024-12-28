
class Information {
    static checkAccountType = () => {
        const accountType = sessionStorage.getItem('accountType');

        const setting = document.getElementById('setting');

        if (accountType === '1' && addAccountButton) {
            setting.remove();
        }
    }
}  

module.exports = Information;