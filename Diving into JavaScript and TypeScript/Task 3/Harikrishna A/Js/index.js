
if (window.localStorage.getItem("Loggedinuser")!=null)
{
    window.location="./Home.html"
    
}
else{
    if(window.localStorage.getItem("testuser@gmail.com")==null){
        const Dataobj={
            Name:"TestUser",
            Phemail:"testuser@gmail.com",
            Month:"December",
            Day:"11",
            Year:"2004",
            Password:"Test@123",
            Description:"Test User",
            Followers:`${Math.trunc(Math.random()*100)}`,
            Following:`${Math.trunc(Math.random()*100)}`
        }
        window.localStorage.setItem(Dataobj.Phemail,JSON.stringify(Dataobj));
    }
}


function Launchpage(pageId,pageTitle){
    document.getElementById('Name-Signup').value=''
    document.getElementById('PhoneNoField').value=''
    
    var page_pointer;
    page_pointer=document.getElementById(pageId)
    document.getElementById("Title").innerHTML=pageTitle

    page_pointer.className=page_pointer.className.replace('hidden','flex')
    LoadPage(pageId)

}

function Closepage(pageId,newtitle){
    var page_pointer;
    page_pointer=document.getElementById(pageId)

    page_pointer.className=page_pointer.className.replace('flex','hidden')
    document.title=newtitle;

}

function RedirectLink(type="normal"){
    if (type=="normal")
    {window.location.href='https://youtu.be/dQw4w9WgXcQ';}
    if (type=="forget")
    {window.location.href='https://youtu.be/glfrDGIRi1M';}
    if (type=="home")
    {
        window.location.href="./Home.html";
    }
    
}

function SwitchPage(crntPage,destPage,Title){
    Closepage(crntPage,Title);
    Launchpage(destPage,Title);

}
ricklist=document.getElementsByClassName("rick")
for (var i = 0; i < ricklist.length; i++) {

    ricklist[i].addEventListener('click', function(){
        window.location.href='https://youtu.be/dQw4w9WgXcQ';}, false);
}

function changetabto(events,tabname) {
    var i,tabcontent,tablist;
    tabcontent=document.getElementsByClassName("tabcontent");
    for (i=0;i<tabcontent.length;i++)
    {
        tabcontent[i].className=tabcontent[i].className.replace("flex",'hidden');
    }
    tablist=document.getElementsByClassName("tablist");
    for(i=0;i<tablist.length;i++)
    {
        tablist[i].className=tablist[i].className.replace(" border-b-4 border-blue-500","");
    }
    document.getElementById(tabname).className=document.getElementById(tabname).className.replace("hidden","flex");
   

    events.currentTarget.className+=" border-b-4 border-blue-500"
    
}
