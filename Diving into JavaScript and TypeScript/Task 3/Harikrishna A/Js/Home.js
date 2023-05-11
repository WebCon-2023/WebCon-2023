

if (window.localStorage.getItem("Loggedinuser")!=null)
{
    usernametaglist=document.getElementsByClassName("usernametag")
    for (var i = 0; i < usernametaglist.length; i++) {


        usernametaglist[i].innerHTML=JSON.parse(window.localStorage.getItem("Loggedinuser")).Name
    }    
}
let LogoutBtntoggle=0;
document.getElementById("UserBtn").addEventListener("click",function(){
    if (LogoutBtntoggle==0){    
        page_pointer=document.getElementById("LogoutBtn")
        page_pointer.className=page_pointer.className.replace('hidden','flex')
        LogoutBtntoggle=1
    }
    else{
        page_pointer=document.getElementById("LogoutBtn")
        page_pointer.className=page_pointer.className.replace('flex','hidden')

        LogoutBtntoggle=0


    }


})

document.getElementById("LogoutBtn").addEventListener('click',function(){
    window.localStorage.removeItem("Loggedinuser")
    window.location="./index.html"
})

function Disablealltab(){
    var i,tabcontent,tablist;
    tabcontent=document.getElementsByClassName("tabcontent");
    for (i=0;i<tabcontent.length;i++)
    {
        tabcontent[i].className=tabcontent[i].className.replace("flex ",'hidden ');
    }
    tablist=document.getElementsByClassName("tablist");
    for(i=0;i<tablist.length;i++)
    {
        tablist[i].className=tablist[i].className.replace(" border-b-4 border-blue-500","");
    }

}


document.getElementById("Profile Btn").addEventListener("click",function(){
    window.location.href="./Profile.html"
          
})
document.getElementById("MobileProfileBtn").addEventListener("click",function(){
    window.location.href="./Profile.html"
          
})
document.getElementById("Home Btn").addEventListener("click",function(){
    window.location.href="./Home.html"
          
})
document.getElementById("MobileHomeBtn").addEventListener("click",function(){
    window.location.href="./Home.html"
          
})
document.getElementById("Settings Btn").addEventListener("click",function(){
    window.location.href='https://youtu.be/dQw4w9WgXcQ';
          
})
document.getElementById("Explore Btn").addEventListener("click",function(){
    window.location.href='https://youtu.be/dQw4w9WgXcQ';

})
document.getElementById("Tweet Btn").addEventListener("click",function(){
    window.location.href='https://youtu.be/AFicYbv-mzg';

})
ricklist=document.getElementsByClassName("rick")
for (var i = 0; i < ricklist.length; i++) {

    ricklist[i].addEventListener('click', function(){
        window.location.href='https://youtu.be/dQw4w9WgXcQ';}, false);
}
document.getElementById("Stalking Tab").addEventListener("click",function(){
    Disablealltab()
    document.getElementById("Stalking Content").className=document.getElementById("Stalking Content").className.replace("hidden","flex");
    document.getElementById("Stalking Btn").className+=" border-b-4 border-blue-500"
    document.getElementById("Stalking Content").scrollTo(0,570)
          
})
document.getElementById("Foryou Tab").addEventListener("click",function(){
    Disablealltab()
    document.getElementById("Foryou Content").className=document.getElementById("Foryou Content").className.replace("hidden","flex");
    document.getElementById("Foryou Btn").className+=" border-b-4 border-blue-500"
          
})