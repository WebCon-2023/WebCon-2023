function applyForJob() {
    window.location.href = "../registration"
}

function submitForm() {
    if (checkCompletedForm()) {
        document.getElementById("main-form").style.display = "none";
        document.getElementById("submitted").style.display = "block";
        window.localStorage.setItem("submitted", "true");
    }
}

function removeSubmission() {
    window.localStorage.removeItem("submitted");
    window.location.reload();
}

function checkCompletedForm() {
    const formElements = document.getElementById("main-form").elements;
    let isCompleted = true;
    for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].value === "") {
            isCompleted = false;
            break;
        }
    }
    if (isCompleted) {
        return true;
    } else {
        return false;
    }
}