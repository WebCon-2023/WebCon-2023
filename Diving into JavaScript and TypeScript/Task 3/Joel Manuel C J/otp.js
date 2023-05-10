let x=Math.floor((Math.random() * 10000) + 1);
alert("Your OTP is "+x);
function otp_generation()
{
    x = Math.floor((Math.random() * 10000) + 1);
    alert("Your OTP is "+x);
}
function index_page() {
    location.replace("index.html")
  }
  function otp_position1()
  {
    let otp1=document.getElementById("otp1").value
    let otp2=document.getElementById("otp2").value
    let otp3=document.getElementById("otp3").value
    let otp4=document.getElementById("otp4").value
    if(otp1.length>1)
    {
        if(otp2=="")
        {
            document.getElementById("otp1").value=otp1[0]
            document.getElementById("otp2").value=otp1[1]
        }
        else if(otp3=="")
        {
            document.getElementById("otp1").value=otp1[0]
            document.getElementById("otp3").value=otp1[1]
        }
        else if(otp4=="")
        {
            document.getElementById("otp1").value=otp1[0]
            document.getElementById("otp4").value=otp1[1]
        }
        else
        {
            document.getElementById("otp1").value=otp1[1]
        }
    }
  }
  function otp_position2()
  {
    let otp1=document.getElementById("otp1").value
    let otp2=document.getElementById("otp2").value
    let otp3=document.getElementById("otp3").value
    let otp4=document.getElementById("otp4").value
    if(otp2.length>1)
    {
        if(otp3=="")
        {
            document.getElementById("otp2").value=otp2[0]
            document.getElementById("otp3").value=otp2[1]
        }
        else if(otp4=="")
        {
            document.getElementById("otp2").value=otp2[0]
            document.getElementById("otp4").value=otp2[1]
        }
        else if(otp1=="")
        {
            document.getElementById("otp1").value=otp2[0]
            document.getElementById("otp2").value=otp2[1]
        }
        else
        {
            document.getElementById("otp2").value=otp2[1]
        }
    }
  }
  function otp_position3()
  {
    let otp1=document.getElementById("otp1").value
    let otp2=document.getElementById("otp2").value
    let otp3=document.getElementById("otp3").value
    let otp4=document.getElementById("otp4").value
    if(otp3.length>1)
    {
        if(otp4=="")
        {
            document.getElementById("otp3").value=otp3[0]
            document.getElementById("otp4").value=otp3[1]
        }
        else if(otp2=="")
        {
            document.getElementById("otp2").value=otp3[0]
            document.getElementById("otp3").value=otp3[1]
        }
        else if(otp1=="")
        {
            document.getElementById("otp1").value=otp2[0]
            document.getElementById("otp2").value=otp3[0]
            document.getElementById("otp3").value=otp3[1]
        }
        else
        {
            document.getElementById("otp3").value=otp3[1]
        }
    }
  }
  function otp_position4()
  {
    let otp1=document.getElementById("otp1").value
    let otp2=document.getElementById("otp2").value
    let otp3=document.getElementById("otp3").value
    let otp4=document.getElementById("otp4").value
    if(otp4.length>1)
    {
        if(otp3=="")
        {
            document.getElementById("otp3").value=otp4[0]
            document.getElementById("otp4").value=otp4[1]
        }
        else if(otp2=="")
        {
            document.getElementById("otp2").value=otp3[0]
            document.getElementById("otp3").value=otp4[0]
            document.getElementById("otp4").value=otp4[1]
        }
        else if(otp1=="")
        {
            document.getElementById("otp1").value=otp2[0]
            document.getElementById("otp2").value=otp3[0]
            document.getElementById("otp3").value=otp4[0]
            document.getElementById("otp4").value=otp4[1]
        }
        else
        {
            document.getElementById("otp4").value=otp4[1]
        }
    }
  }
function otp_check()
{
    let otp1=document.getElementById("otp1").value
    let otp2=document.getElementById("otp2").value
    let otp3=document.getElementById("otp3").value
    let otp4=document.getElementById("otp4").value
    let otp=otp1+otp2+otp3+otp4
    if(otp==x)
    {
        login_page()
    }
    else
    {
        alert("Incorrect OTP")
    }
}
function login_page() {
    location.replace("login.html")
  }