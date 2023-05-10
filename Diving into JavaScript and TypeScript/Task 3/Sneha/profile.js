// Retrieve the users array from localStorage, or use a default value if it doesn't exist
const users = JSON.parse(localStorage.getItem('users')) || ['Sneha', 'Chandana', 'Rachel'];

const memberDiv = document.querySelector('.memberDiv');
const addIcon = document.querySelector('.addIcon');

const userIcons = () => {
    users.reverse();
    users.map((curElem) => {
        memberDiv.insertAdjacentHTML('afterbegin', `
        <button class="btn"><span>${curElem}</span></button>
        `);
    })
};

addIcon.addEventListener('click', () => {
    let userName = prompt('please enter your name');

    if(userName != null && !users.includes(userName)){
        // Create a new array that includes the existing users as well as the new username
        const newUsers = [...users, userName];
        console.log(newUsers);
        localStorage.setItem('users', JSON.stringify(newUsers)); // Store the new data in localStorage
        users.splice(0, users.length, ...newUsers); // Replace the existing users array with the new array
        userIcons();
    } else {
        alert('username already exists');
    }
})

userIcons();