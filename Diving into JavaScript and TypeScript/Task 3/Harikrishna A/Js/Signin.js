let Emailid;

function NextSigninPage(pageindex=1){
    if (document.getElementById("Email-Signin").value.length>0)
    {

        SetEmailid(document.getElementById("Email-Signin").value)
        for(var u=0;u<=window.localStorage.length;u++){
            if (window.localStorage.key(u)!=(document.getElementById("Email-Signin").value).toLowerCase()){
                console.log('User not found')
            }
            else{

                SwitchPage("Signin","Final Signin","Signin")
            }
        }
    }
    
}

function SetEmailid(emailid){
    document.getElementById("Sigin2emailid").innerHTML=emailid;
    Emailid=emailid
}




function SiginIntialization(){
    console.log(JSON.parse(window.localStorage.getItem((Emailid).toLowerCase())).Password)
    if (document.getElementById("LoginPass").value ==JSON.parse(window.localStorage.getItem((Emailid).toLowerCase())).Password)
    {
        window.location.href="./Home.html"
        window.localStorage.setItem("Loggedinuser",JSON.stringify(JSON.parse(window.localStorage.getItem((Emailid).toLowerCase()))))

    }
    
}

let eye=1
function eyebtn(){
    if (eye==1){
        document.getElementById('LoginPass').type='text'
        document.getElementById('eyebtnimg').src="./Icons/eye-slash.svg"
        eye=0
    }
    else{
        document.getElementById('LoginPass').type='password'
        document.getElementById('eyebtnimg').src="./Icons/eye.svg"
        eye=1
    }

}