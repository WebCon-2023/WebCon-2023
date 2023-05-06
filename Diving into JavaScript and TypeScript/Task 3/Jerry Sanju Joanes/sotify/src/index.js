const burger = document.querySelector('#burger')
const menu = document.querySelector('#menu')


burger.addEventListener('click',()=>{
    if ( menu.classList.contains('hidden')){
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
})


signupwarninglist=document.getElementsByClassName("signup-warning")
for (var i = 0; i < signupwarninglist.length; i++) {

    signupwarninglist[i].addEventListener('click', function(){
        alert("Signup First!");}, false);

    }



