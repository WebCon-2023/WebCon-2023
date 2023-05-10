const form = document.querySelector('form');
const span = document.querySelector('span');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('input[type="email"]:nth-of-type(1)').value;
    const emailConfirmation = document.querySelector('input[type="email"]:nth-of-type(2)').value;
    const password = document.querySelector('input[type="password"]').value;
    const profileName = document.querySelector('input[type="text"]').value;
    const dob = document.querySelector('input[type="date"]').value;
    const gender = document.querySelector('input[type="radio"]:checked');
    const genderValue = gender ? gender.value : 'not specified';

    if (!email || !password || !emailConfirmation || !profileName || !dob || !gender) {
        const errorMessage = document.createElement('p');
        errorMessage.innerText = 'Please fill in all fields';
        errorMessage.style.color = 'red';
        span.appendChild(errorMessage);
        return;
    }

    if (email !== emailConfirmation) {
        const errorMessage = document.createElement('p');
        errorMessage.innerText = 'Email confirmation does not match';
        errorMessage.style.color = 'red';
        span.appendChild(errorMessage);
        return;
    }

    const userData = {
        email: email,
        password: password,
        profileName: profileName,
        dob: dob,
        gender: genderValue,
    };
    console.log(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    window.location.href = 'login.html';
});
