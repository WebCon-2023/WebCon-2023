const form = document.querySelector('form');
const span = document.querySelector('span');
const userData = JSON.parse(localStorage.getItem('userData'));

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    if (!username || !password) {
        const errorMessage = document.createElement('p');
        errorMessage.innerText = 'Please fill in all fields';
        errorMessage.style.color = 'red';
        span.appendChild(errorMessage);
        return;
    }

    if ((username != userData.profileName || username != userData.email) && password !== userData.password) {
        const errorMessage = document.createElement('p');
        errorMessage.innerText = 'Credentials does not match';
        errorMessage.style.color = 'red';
        span.appendChild(errorMessage);
        return;
    }
    console.log('Login successful');
    sessionStorage.setItem('isLoggedIn', true);
    window.location.href = 'index.html';
});
