document.getElementById("loginid").defaultValue = "Mobile number*";
var x=1,id="login";
function check()
{
    if(document.getElementById("loginid").value=="")
    {
        id=document.getElementById("loginid").value
        var loginid = document.getElementById("err1")
        var element="<h3>Please enter a phone number</h3>"
        loginid.innerHTML += element
    }
    else{
       
        window.location.href = "otp.html";
    }
}

