let isSumitted = window.localStorage.getItem("submitted");
if (isSumitted) {
    document.getElementById("main-form").style.display = "none";
    document.getElementById("submitted").style.display = "block";
}