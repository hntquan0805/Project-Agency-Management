document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await window.api.signUp(username, password);
    if (result.success) {
        alert('Sign Up Successful!');
        window.location.href = 'home.html';
    } else {
        alert('Error: ' + result.message);
    }
});
