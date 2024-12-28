const loginForm = document.getElementById('login-form');
// const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await window.api.login(username, password);

    if (!response.success) {
        alert(response.message);
        return;
    }

    sessionStorage.setItem('account-position', response.dataValues.position);

    if (response.success) {
        window.location.href = '../views/dashboard.html';
    } else {
        // errorMessage.textContent = response.message;
        // errorMessage.style.display = 'block';
    }
});