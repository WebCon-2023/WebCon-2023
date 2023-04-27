var btn = document.getElementById("btn");
var iform = document.getElementById("iform");
var dmail="don@gmail.com";
var dpass="123";

btn.addEventListener("click", function(event) {
    event.preventDefault();
    var mail = document.getElementById("mail").value;
    var pass = document.getElementById("pass").value;
    if(mail === dmail && pass === dpass)
    {
        window.location.href = "homepage.html";
    }
    else
    {
        
        alert("Invalid email or password, Please try again!"); 
    }
  });
 