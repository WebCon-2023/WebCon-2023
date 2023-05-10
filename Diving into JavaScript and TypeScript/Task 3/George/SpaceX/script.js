const btn =document.getElementById('menu-btn')


btn.addEventListener('click', opener);

function opener()
{
    btn.classList.toggle('open');
    overlay.classList.toggle('overlay-show');
    document.body.classList.toggle('stop-scrolling');
    menu.classList.toggle('show-menu');
}