// variables related to 
var mainWindow, windowElements, numberOfWindows;
var currentIndex = 1;

var progressBar, progressJumps;

const personalDetailsNames = ["fname", "lname", "email"];

function init() {
    mainWindow = document.getElementById("windows");
    windowElements = mainWindow.children;
    numberOfWindows = windowElements.length;

    progressBar = document.getElementById("form-progress-bar");
    progressJumps = (1.0 / numberOfWindows) * 100;

    document.querySelectorAll('input').forEach(element => {
        element.addEventListener("change", function() {
            removeClass(element);
        })
    });
    
    setVisibility(windowElements[currentIndex], true);
}

function next() {
    if (currentIndex >= numberOfWindows - 1) { return; }
    if (!hasValidDetails()) { return; }

    setVisibility(windowElements[currentIndex], false);
    currentIndex++;
    setVisibility(windowElements[currentIndex], true);
    updateProgressBar();
}

function previous() {
    if (currentIndex <= 0) { return; }

    setVisibility(windowElements[currentIndex], false);
    currentIndex--;
    setVisibility(windowElements[currentIndex], true);
    updateProgressBar();
}

function setVisibility(window, visibility) {
    if (visibility) {
        window.classList.remove("hidden");
        window.classList.add("visible");
    } else {
        window.classList.remove("visible");
        window.classList.add("hidden");
    }
}

function updateProgressBar() {
    progressBar.value = progressJumps * (currentIndex + 1);
}

// validating entered data
function hasValidDetails() {
    var canContinue;
    switch (currentIndex) {
        case 0:
            canContinue = validatePersonalDetails();
            break;
        default:
            canContinue = true;
            break;
    }

    if (canContinue) {
        document.getElementById("invalid-data-label").style.visibility = "hidden";
        return true;
    } else {
        document.getElementById("invalid-data-label").style.visibility = "visible";
        return false;
    }
}

function validatePersonalDetails() {
    var validData = true;
    personalDetailsNames.forEach(fieldName => {
        var field = document.forms["booking-form"][fieldName];
        var value = field.value;
        if (value == "") {
            field.classList.add("invalid-input");
            validData = false;
        }
    });

    var field = document.forms["booking-form"]["phone"];
    var value = field.value;
    if (value.length != 10 && parseInt(value) != "NaN") {
        field.classList.add("invalid-input");
        validData = false;
    }

    return validData;
}

function validateTripDetails() {
    var validData = true;

}

function removeClass(element) {
    element.classList.remove('invalid-input');
}