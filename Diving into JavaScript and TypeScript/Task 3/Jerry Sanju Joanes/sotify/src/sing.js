function CheckEmails(){
    const csinge=document.getElementById(email)
    const csingp=document.getElementById(password)

    if(csinge.value.length==0||csingp.value.length==0){
        alert("enter email and password")
    }
}

function CheckEmail(event){
    if (event.currentTarget.value.length>0){
        if (event.currentTarget.value.includes('@gmail.com')==false)
        {
            alert("Invalid Email ID");
            
        }
    }
    else{
        alert("Empyty Email Field")
    }
    }
    
function CheckPass(event){
        if (event.currentTarget.value.length<8){
            
            alert("Password too short")
        }

        }

function CheckName(event){
    if (event.currentTarget.value.length==0){
            
        alert("Name Field can't be empty")
    }

}