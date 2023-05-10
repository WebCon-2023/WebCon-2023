const user = document.getElementById('username');
const email = document.getElementById('email');
const dob = document.getElementById('dob');
const country = document.getElementById('country');
const userData = JSON.parse(localStorage.getItem('userData'));

user.innerText = `Username: ${userData.profileName}`;
email.innerText = `Email: ${userData.email}`;
dob.innerText = `Date of Birth: ${userData.dob}`;
country.innerText = `Country: India`;
