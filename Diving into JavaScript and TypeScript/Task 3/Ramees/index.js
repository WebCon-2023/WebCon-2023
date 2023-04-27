
// let toggleBorder = document.querySelector("#inputTextInner");
// let inputText = document.querySelector("#address")
let dropDown = document.querySelector(".dropDownList");
function show() {
dropDown.classList.toggle("showList");

}

window.addEventListener("click" ,function(event){
if(!event.target.matches(".dropDownSvg")){
   if (dropDown.classList.contains("showList")) {
    dropDown.classList.toggle("showList")
   }
}
}    
)


window.addEventListener("scroll", (event)=>{
    header = document.getElementById("headerContainer");
    searchBarHeader = document.querySelector(".searchBarHeader");

    let sticky = header.offsetTop;
    if(window.pageYOffset > sticky) {
        // for padding between content
    searchBarHeader.classList.add("searchBarHeaderScroll");
    // end
    header.classList.add("scrollHeader");
    }

    else {
        searchBarHeader.classList.remove("searchBarHeaderScroll");
        header.classList.remove("scrollHeader");
    }
    
    if (window.scrollY > 320) {
        let topSearchBar = document.querySelector(".topSearchBar");
        topSearchBar.classList.remove("hidden");
        let btnTop = document.querySelector(".btn");
        btnTop.classList.add("btnScroll");

        
    }
    else if (window.scrollY < 320) {
        let topSearchBar = document.querySelector(".topSearchBar");
        topSearchBar.classList.add("hidden");
        let btnTop = document.querySelector(".btn");
        btnTop.classList.remove("btnScroll");


    }
})




