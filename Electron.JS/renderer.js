const { ipcRenderer } = require('electron');

document.getElementById('signup-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const createdAt = new Date();
    const updateddAt = new Date();

    ipcRenderer.send('user:signup', { name, email, password, createdAt, updateddAt });
});

ipcRenderer.on('signup:response', (event, data) => {
    if (data.success) {
        alert('User created successfully!');
    } else {
        alert(`Error: ${data.error}`);
    }
});
