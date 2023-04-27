window.onload=function(){
// get references to the button and message elements
var Splaid = document.getElementById('S-plaid')
var S = document.getElementById('S')
var specsp1 = document.getElementById('spec-sp1')
var specsp2 = document.getElementById('spec-sp2')
var specs1 = document.getElementById('spec-s1')
var specs2 = document.getElementById('spec-s2')
var asideMenu = document.getElementById('aside-Menu')
var Menu = document.getElementById('Menu')
var Blur = document.getElementById('backdrop')
var closeButton = document.getElementById('close')
const faders = document.querySelectorAll('.anim')

const appearOptions = {
    threshold: 0.75,
    rootMargin: "0px 0px -100px 0px"
};
const appearOnScoll = new IntersectionObserver(
    function(
        entries,
        appearOnScoll
    )    {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScoll.unobserve(entry.target);
            }
        })
    },
appearOptions);

faders.forEach(fader => {
    appearOnScoll.observe(fader)
});

specs1.style.display = "none";
specs2.style.display = "none";
Splaid.style.border = '3px solid white'
Menu.style.cursor = 'pointer';
closeButton.style.cursor = 'pointer';

// add event listeners for the button clicks
Splaid.addEventListener('click', function() {
    specsp1.style.display = 'block';
    specsp2.style.display = 'block';
    specs1.style.display = 'none'; 
    specs2.style.display = 'none'; 
    Splaid.style.border = '3px solid white';
    S.style.border = '3px solid grey';
});

S.addEventListener('click', function() {
    specsp1.style.display = 'none';
    specsp2.style.display = 'none';
    specs1.style.display = 'block';
    specs2.style.display = 'block'; 
    Splaid.style.border = '3px solid grey';
    S.style.border = '3px solid white'; 
});

Menu.addEventListener('click', function() {
    asideMenu.style.display = 'block';
    Blur.style.display = 'block';
})

closeButton.addEventListener('click', function() {
    asideMenu.style.display = 'none';
    Blur.style.display = 'none';
})

Blur.addEventListener('click', function() {
    asideMenu.style.display = 'none';
    Blur.style.display = 'none';
})
}

