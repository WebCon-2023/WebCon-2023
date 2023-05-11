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

if (window.localStorage.getItem("Loggedinuser")!=null)
{
    usernametaglist=document.getElementsByClassName("usernametag")
    for (var i = 0; i < usernametaglist.length; i++) {


        usernametaglist[i].innerHTML=JSON.parse(window.localStorage.getItem("Loggedinuser")).Name
    }    
}


document.getElementById("Profile Btn").addEventListener("click",function(){
    window.location.href="./Profile.html"
          
})
document.getElementById("Home Btn").addEventListener("click",function(){
    window.location.href="./Home.html"
          
})
document.getElementById("Settings Btn").addEventListener("click",function(){
    window.location.href='https://youtu.be/dQw4w9WgXcQ';
          
})
document.getElementById("Explore Btn").addEventListener("click",function(){
    window.location.href='https://youtu.be/dQw4w9WgXcQ';

})
ricklist=document.getElementsByClassName("rick")
for (var i = 0; i < ricklist.length; i++) {

    ricklist[i].addEventListener('click', function(){
        window.location.href='https://youtu.be/dQw4w9WgXcQ';}, false);
}
document.getElementById("Tweet Tab").addEventListener("click",function(){
    Disablealltab()
    document.getElementById("Tweet Content").className=document.getElementById("Tweet Content").className.replace("hidden","flex");
    document.getElementById("Tweet Btn").className+=" border-b-4 border-blue-500"
          
})
document.getElementById("Likes Tab").addEventListener("click",function(){
    Disablealltab()
    document.getElementById("Likes Content").className=document.getElementById("Likes Content").className.replace("hidden","flex");
    document.getElementById("Likes Btn").className+=" border-b-4 border-blue-500"
          
})

document.getElementById("Media Tab").addEventListener("click",function(){
    Disablealltab()
    document.getElementById("Media Content").className=document.getElementById("Media Content").className.replace("hidden","flex");
    document.getElementById("Media Btn").className+=" border-b-4 border-blue-500"
          
})

document.getElementById("Profile Description").innerHTML=JSON.parse(window.localStorage.getItem("Loggedinuser")).Description
document.getElementById("Profile DOB").innerHTML+=(" "+JSON.parse(window.localStorage.getItem("Loggedinuser")).Day +" "+JSON.parse(window.localStorage.getItem("Loggedinuser")).Month+" "+JSON.parse(window.localStorage.getItem("Loggedinuser")).Year)
document.getElementById("Follower Count").innerHTML=JSON.parse(window.localStorage.getItem("Loggedinuser")).Followers
document.getElementById("Following Count").innerHTML=JSON.parse(window.localStorage.getItem("Loggedinuser")).Following

document.getElementById("Backbtn").addEventListener("click",function(){
    window.location='./Home.html'
})