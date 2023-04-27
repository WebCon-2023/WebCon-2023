const isLoggedIn = sessionStorage.getItem('isLoggedIn');
const userData = JSON.parse(localStorage.getItem('userData'));

if (isLoggedIn) {
    const nav = document.querySelector('nav');
    nav.style.backgroundColor = '#592d23';

    const signUp = document.querySelector('#signup');
    signUp.innerHTML = '<a href="#">Upgrade</a>';

    const login = document.querySelector('.login');
    login.style.backgroundColor = "black";

    const logIn = login.querySelector('a');
    logIn.innerHTML = `<a href="profile.html">${userData.profileName}</a>`;

    const a = logIn.querySelector('a');
    a.style.color = "white";
    a.style.cursor = "pointer";
    a.style.paddingLeft = "1vh";

    const welcome = document.querySelector('h1');
    welcome.style.color = "white";


    const today = new Date();
    const hour = today.getHours();
    if (hour >= 5 && hour < 12) {
        welcome.innerText = "Good morning";
    } else if (hour >= 12 && hour < 18) {
        welcome.innerText = "Good afternoon";
    } else {
        welcome.innerText = "Good evening";
    }

    const logout = document.querySelector('#logout');
    logout.style.display = "inline";

    const revertChanges = () => {
        nav.style.backgroundColor = '#060606';
        signUp.innerHTML = '<a href="signup.html">Sign up</a>';
        login.style.backgroundColor = 'white';
        logIn.innerHTML = '<a href="login.html">Log in</a>';
        welcome.style.display = 'none';
        a.style.color = 'black';
        a.style.cursor = '';
        a.style.paddingLeft = '';
        logout.style.display = 'none';
    };

    const logoutButton = document.querySelector('#logout');
    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('isLoggedIn');
        revertChanges();
    })
}

const music = document.querySelector('#music');
music.addEventListener('click', () => {
    const playlists = document.querySelectorAll('.playlist');
    playlists.forEach(playlist => {
        playlist.style.display = 'none';
    });

    const playlist1 = document.querySelector('.playlist-1');
    playlist1.style.display = 'none';

    const container = document.querySelector('.container');
    container.style.display = 'block';

    const bottom = document.querySelector('.bottom');
    bottom.style.display = 'flex';

    let songIndex = 0;
    let audioElement = new Audio('audio/1.mp3');
    let masterPlay = document.getElementById('masterPlay');
    let myProgressBar = document.getElementById('myProgressBar');

    masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            let playIcon = document.getElementById(songIndex);
            playIcon.classList.remove('fa-play-circle');
            playIcon.classList.add('fa-pause-circle');
        }
        else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
    })

    audioElement.addEventListener('timeupdate', () => {
        progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
        let currentStart = document.getElementById('currentStart');
        let currentEnd = document.getElementById('currentEnd');
        let currentTime = formatTime(audioElement.currentTime);
        let duration = formatTime(audioElement.duration);
        currentStart.textContent = currentTime;
        currentEnd.textContent = duration;
    })

    myProgressBar.addEventListener('change', () => {
        audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    })

    const makeAllPlays = () => {
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        })
    }

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.addEventListener('click', (e) => {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `audio/${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        })
    })

    document.getElementById('next').addEventListener('click', () => {
        if (songIndex >= 5) {
            songIndex = 0
        }
        else {
            songIndex += 1;
        }
        playSong();
        let playIcon = document.getElementById(songIndex);
        playIcon.classList.remove('fa-play-circle');
        playIcon.classList.add('fa-pause-circle');
    })

    document.getElementById('previous').addEventListener('click', () => {
        if (songIndex <= 0) {
            songIndex = 5
        }
        else {
            songIndex -= 1;
        }
        playSong();
        let playIcon = document.getElementById(songIndex);
        playIcon.classList.remove('fa-play-circle');
        playIcon.classList.add('fa-pause-circle');
    })

    const playSong = () => {
        audioElement.src = `audio/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        makeAllPlays();
        let songItem = document.getElementById(songIndex);
        let songPlayIcon = songItem.querySelector('.songItemPlay');
        songPlayIcon.classList.remove('fa-play-circle');
        songPlayIcon.classList.add('fa-pause-circle');
    }

    const formatTime = (seconds) => {
        let min = Math.floor(seconds / 60);
        let sec = Math.floor(seconds % 60);
        sec = sec < 10 ? `0${sec}` : sec;
        return `${min}:${sec}`;
    }
})