document.getElementById("password").defaultValue = "Enter your password";
alert("Your password is password");
function toggle()
{
    var x = document.getElementById("password");
    if(x.type === "password")
    {
        x.type = "text";
    }
    else
    {
        x.type = "password";
    }
}
function next_page()
{
    var x = document.getElementById("password").value;
    console.log(x)
    if(x == "password")
    {
        window.location.href = "landing.html";
    }
    else
    {
        alert("Wrong password");
    }
}
function otp_page()
{
    window.location.href = "otp.html";
}