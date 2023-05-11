var Field2='phonenumber';
var i=1;
var j=1;

var NameCheck,Phnoremailchck,Datechck,PassReq,PassMatch;
var Month_List=['January','February',"March","April","May","June","July","August","September","October","Novermber","December"]




function ChangeType(){
    document.getElementById("New-Password").type="text";
}

function LoadPage(pageindex){

    if (pageindex=="Signup 1")
    {
        document.getElementById('Nextbtn 1').setAttribute('disabled','disabled');
    }
    if (pageindex=="Signup 2")
    {
        document.getElementById('Nextbtn 2').setAttribute('disabled','disabled');
    }
    if (pageindex=="Signup 3")
    {
        j=1
        document.getElementById("Termscheck").value="off"
        document.getElementById('Nextbtn 3').setAttribute('disabled','disabled');
    }
}



function UnloadErrorBanner(type)
{
    warning_banner=document.getElementById(`Required ${type}`)
    if (warning_banner.className.includes('flex '))
    {
        warning_banner.className=warning_banner.className.replace('flex','hidden')
    }

}

function CheckTheField(event,fieldtype)
{
    

    if (fieldtype=="name")
    {
        if (event.currentTarget.value.length==0)
        {

            warning_banner=document.getElementById('Required name')
            warning_banner.className=warning_banner.className.replace('hidden','flex')
            NameCheck=false;
        }
        else
        {   
            NameCheck=true
            UnloadErrorBanner('name')
        }

    }

    if (fieldtype=='phonenumber')
    {

        if (((event.currentTarget.value.length>10)||((event.currentTarget.value.match(/^[0-9]+$/) != null)==false))&&event.currentTarget.value!="")
        {
            warning_banner=document.getElementById('Required email')
            warning_banner.innerHTML=warning_banner.innerHTML.replace('Email','Phonenumber')
            warning_banner.className=warning_banner.className.replace('hidden','flex')
            Phnoremailchck=false

        }
        else{
            if ((event.currentTarget.value.length==10)&&event.currentTarget.value!="")
            {Phnoremailchck=true}
            UnloadErrorBanner("email")
        }

    }

    if (fieldtype=='email')
    {
        if (event.currentTarget.value.length>10)
        {
            if (event.currentTarget.value.includes('@gmail.com')==false)
            {
                warning_banner=document.getElementById('Required email')
                warning_banner.className=warning_banner.className.replace('hidden','flex')
                warning_banner.innerHTML=warning_banner.innerHTML.replace('Phonenumber','Email')
                Phnoremailchck=false
                
            }else{UnloadErrorBanner('email');Phnoremailchck=true;}

        }
        else{
            UnloadErrorBanner('email');Phnoremailchck=true;

        }
    }

    if (fieldtype=='datetime')
    {
        if ((document.getElementById('Month-Signup').value!="Month")&&(document.getElementById('Day-Signup').value!="Day")&&(document.getElementById('Year-Signup').value!="Year"))
        {
            Datechck=true
        }
        
    }
    NextBtn_activator(1)
}

function changeField2(event)
{
    i++
    if (i%2==0)
    {
        document.getElementById('PhoneNoField').placeholder="Email"
        
        event.currentTarget.innerHTML="Use Phone Number instead"
        Field2='email'
        warning_banner=document.getElementById('Required email')
        
    }
    else
    {
        document.getElementById('PhoneNoField').placeholder="Phone Number"
        event.currentTarget.innerHTML="Use email instead"
        Field2='phonenumber'
        warning_banner=document.getElementById('Required email')
    }
    document.getElementById('PhoneNoField').value=''
    UnloadErrorBanner('email')
    Phnoremailchck=false
    NextBtn_activator(1)
}

function Load_Options()
{
    selectMonth=document.getElementById('Month-Signup').innerHTML
    Month_List.forEach(element => {
        selectMonth+=`<option> ${element}</option>\n`
        
    });
    document.getElementById('Month-Signup').innerHTML=selectMonth
    
    selectDay=document.getElementById('Day-Signup').innerHTML
    for (let i=1;i<=31;i++)
    {
        selectDay+=`<option> ${i}</option>\n`

    }
    document.getElementById('Day-Signup').innerHTML=selectDay
    
    selectYear=document.getElementById('Year-Signup').innerHTML
    for (let i=1996;i<=2023;i++)
    {
        selectYear+=`<option> ${i}</option>\n`

    }
    document.getElementById('Year-Signup').innerHTML=selectYear

    
}
Load_Options()

function NextBtn_activator(pageindex){


    if ((NameCheck==true)&&(Phnoremailchck==true)&&(Datechck==true)&&(pageindex==1))
    {
        if ((document.getElementById('PhoneNoField').value.length==10)||Field2=="email")
        {document.getElementById('Nextbtn 1').removeAttribute("disabled");}
        else{
            document.getElementById('Nextbtn 1').setAttribute('disabled','disabled');
        }
    }
    else{
        if ((document.getElementById('Nextbtn 1').getAttribute("disabled")==null)&&(pageindex==1)){
            document.getElementById('Nextbtn 1').setAttribute('disabled','disabled');
        }
    }
    if(pageindex==2)
    {
        if ((PassReq==true)&&(PassMatch==true))
        {document.getElementById('Nextbtn 2').removeAttribute("disabled");}
        else{
            document.getElementById('Nextbtn 2').setAttribute('disabled','disabled');
        }

    }
}


function NextAction(pageindex){

    if (pageindex==1)
    {
        const Dataobj={
            Name:document.getElementById('Name-Signup').value,
            Phemail:document.getElementById('PhoneNoField').value,
            Month:document.getElementById('Month-Signup').value,
            Day:document.getElementById('Day-Signup').value,
            Year:document.getElementById('Year-Signup').value
        }
        window.sessionStorage.setItem(Dataobj.Phemail,JSON.stringify(Dataobj));
        window.sessionStorage.setItem("CurrentUser",Dataobj.Phemail)
        
        Closepage("Signup 1");
        Launchpage("Signup 2","Signup-Now");
    }
    if (pageindex==2)
    {
        request=window.sessionStorage.getItem(window.sessionStorage.getItem("CurrentUser"))
        jsonobj=JSON.parse(request)
        jsonobj.Password=document.getElementById("New-Password").value
        window.sessionStorage.setItem(jsonobj.Phemail,JSON.stringify(jsonobj))

        Closepage("Signup 2");
        Launchpage("Signup 3","Signup-Now");
    }
    if (pageindex==3)
    {
        request=window.sessionStorage.getItem(window.sessionStorage.getItem("CurrentUser"))
        jsonobj=JSON.parse(request)
        jsonobj.Description=document.getElementById("Description").value
        jsonobj.Followers=Math.trunc(Math.random()*100)
        jsonobj.Following=Math.trunc(Math.random()*100)
        window.localStorage.setItem(jsonobj.Phemail.toLowerCase(),JSON.stringify(jsonobj))
        window.localStorage.setItem("Loggedinuser",JSON.stringify(jsonobj))
        window.sessionStorage.clear()
        Closepage("Signup 3");
        window.location.href="./Home.html"
    }

}


function CheckPassReq(){

    Pass=document.getElementById("New-Password").value
    if (Pass.length<8)
    {
        PassReq=false
        document.getElementById("InvalidPassword-Signup").className=document.getElementById("InvalidPassword-Signup").className.replace("hidden","flex");
    }
    else{
        if (document.getElementById("InvalidPassword-Signup").className.includes("flex")==true)
        {
            document.getElementById("InvalidPassword-Signup").className=document.getElementById("InvalidPassword-Signup").className.replace("flex","hidden");

        }
        PassReq=true
    }
    document.getElementById("New-Password").type="Password"

}

function CheckPassMatch(){

    Pass1=document.getElementById("New-Password").value
    Pass2=document.getElementById("Retype-Password").value
    console.log(Pass1,Pass2)
    if (Pass1!=Pass2)
    {
        PassMatch=false
        document.getElementById("Passwordmatcherror").className=document.getElementById("Passwordmatcherror").className.replace("hidden","flex");
    }
    else{
        if (document.getElementById("Passwordmatcherror").className.includes("flex")==true)
        {
            document.getElementById("Passwordmatcherror").className=document.getElementById("Passwordmatcherror").className.replace("flex","hidden");

        }
        PassMatch=true
    }
    NextBtn_activator(2)

}

function TermsCheck(){
    j++;
    if (j%2==0)
    {
        document.getElementById('Nextbtn 3').removeAttribute("disabled");
    }else
    {
        document.getElementById('Nextbtn 3').setAttribute('disabled','disabled');
    }
}