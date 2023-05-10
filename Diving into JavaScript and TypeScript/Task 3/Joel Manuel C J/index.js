
document.getElementById("loginid").defaultValue = "Enter phone number or email";
let id="login";
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
function check()
{
    if(document.getElementById("loginid").value=="")
    {
        id=document.getElementById("loginid").value
        var loginid = document.getElementById("err1")
        var element="<h3>Please enter a phone number or email</h3>"
        loginid.innerHTML += element
    }
    else{
        console.log(id)
        otp_page()
    }
}

function otp_page() {
    location.replace("otp.html")
  }

