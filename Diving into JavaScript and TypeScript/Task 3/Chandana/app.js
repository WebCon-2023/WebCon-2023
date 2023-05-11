var audio = document.getElementById('audio');
var playButton = document.getElementById('playButton');


playButton.addEventListener('click', ()=>{
    if(audio.paused){
        audio.play()
        playButton.classList.remove('fa-pause');
        playButton.classList.add('fa-play');
        
    }
    else{
        audio.pause()
        playButton.classList.remove('fa-play');
        playButton.classList.add('fa-pause');
    }
});

function navigateToLoginPage() {
    window.location.href = 'file:///E:/Web%20dev/Spotify%20clone/login_of_spotify.html';
}
  
