const loginForm = document.getElementById('login-form');
// const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("vo goi ne!");
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await window.api.login(username, password);

    if (!response.success) {
        alert(response.message);
        return;
    }
    console.log(response);
    sessionStorage.setItem('account-position', response.account.dataValues.position);
    sessionStorage.setItem('account-code', response.account.dataValues.username);
    if (response.success) {
        window.location.href = '../../home/views/dashboard.html';
    } else {
        // errorMessage.textContent = response.message;
        // errorMessage.style.display = 'block';
    }
});