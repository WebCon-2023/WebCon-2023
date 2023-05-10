
var asideMenu = document.getElementById('aside-Menu')
var Menu = document.getElementById('Menu')
var Blur = document.getElementById('backdrop')
var closeButton = document.getElementById('close')
const faders = document.querySelectorAll('.anim')

const appearOptions = {
    threshold: 1,
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


Menu.style.cursor = 'pointer';
closeButton.style.cursor = 'pointer';

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
