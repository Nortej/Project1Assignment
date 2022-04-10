const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
"October", "November", "December"];

// variables related to the form movement
var mainWindow, windowElements, numberOfWindows;
var currentIndex = 0;

const percentageJumps = [0, 33, 66, 90, 95, 100];
const personalDetailsNames = ["fname", "lname", "email"];
const tripOverviewNames = ["where", "when", "adultCount", "childCount"];
const tAndCNames = ["lnca-agree", "t-and-c-agree"];

const fieldReviewMap = {
    "fname": "first-name", "lname": "last-name", "phone": "phone-number", "email": "email-address",
    "where": "where", "when": "when", "adultCount": "adult-count", "childCount": "child-count",
    "cookToolsEntry": "cooking-tools", "surfboards": "surfboard-count", "goggles": "goggles-count", "wetsuit": "wetsuit-count", "scuba": "scuba-count"
};

// variables related to data verification
var captchaColor, submitButton, invalidDataLabel;

// variables related to the progress bar
var progressBar, progressDisplay;

function init() {
    mainWindow = document.getElementById("windows");
    windowElements = mainWindow.children;
    numberOfWindows = windowElements.length;

    // getting the elements in the document related to the progress bar
    progressBar = document.getElementById("form-progress-bar");
    progressDisplay = document.getElementById("form-progress-percent");

    // getting ehelements in the document related to the captcha
    submitButton = document.getElementById("submit-form");
    invalidDataLabel = document.getElementById("invalid-data-label");

    // removing the invalid class when an element gets its value changed.
    document.querySelectorAll('input, select').forEach(element => {
        element.addEventListener("change", function() {
            removeClass(element);
        });
    });

    // removing the invalid class when a radio buttons get its value changed
    document.querySelectorAll('input[type=radio], input[type=checkbox]').forEach(element => {
        element.addEventListener("change", function() {
            removeClass(element.parentElement);
        });
    });

    // setting the date to be the current date as you can't book in the past
    var date = new Date();
    var dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    document.querySelectorAll('input[type=date]').forEach(element => {
        element.min = dateString;
    });

    // setting the function of all range elements to display its value in an associated label.
    document.querySelectorAll('input[type=range]').forEach(element => {
        var displayElement = document.getElementById(element.id.split("Range")[0] + "Display");
        element.addEventListener("input", function() {
            displayElement.innerHTML = element.value;
        });
    });

    // setting the function of all colour pickers to display its value as the background.
    document.querySelectorAll('input[type=color]').forEach(element => {
        element.addEventListener("change", function() {
            element.style.backgroundColor = element.value;
        });
    });
    
    // sets the correct index's visibility
    setVisibility(windowElements[currentIndex], true);
    updateProgressBar();
}

// sets the visibility of the next window to being visible
function next() {
    if (currentIndex >= numberOfWindows - 1) { return; }
    if (!hasValidDetails()) { return; }

    setVisibility(windowElements[currentIndex], false);
    currentIndex++;
    setVisibility(windowElements[currentIndex], true);
    updateProgressBar();

    if (currentIndex == 4) {
        displayReviewData();
    }
}

// sets the visibility of the previous window to being visible
function previous() {
    if (currentIndex <= 0) { return; }

    setVisibility(windowElements[currentIndex], false);
    currentIndex--;
    setVisibility(windowElements[currentIndex], true);
    updateProgressBar();
}

// sets the visibility of the element provided to being visible or invisible
function setVisibility(window, visibility) {
    if (visibility) {
        window.classList.remove("hidden");
        window.classList.add("visible");
    } else {
        window.classList.remove("visible");
        window.classList.add("hidden");
    }
}

// updates the progress bar to show the correct data
function updateProgressBar() {
    var newPercentage = percentageJumps[currentIndex] + "%";
    progressBar.style.width = newPercentage;
    progressDisplay.innerHTML = newPercentage;
}

// validating entered data
function hasValidDetails() {
    var canContinue;
    switch (currentIndex) {
        case 0:
            canContinue = validatePersonalDetails();
            break;
        case 1:
            canContinue = validateTripDetails();
            break;
        case 2:
            canContinue = validateTripAddons();
            break;
        case 3: 
            canContinue = validateTAndC();
            break;
        default:
            canContinue = true;
            break;
    }

    if (canContinue) {
        invalidDataLabel.style.opacity = "0";
        return true;
    } else {
        invalidDataLabel.style.opacity = "1";
        return false;
    }
}

// validating the personal details tab
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

// validating the trip details tab
function validateTripDetails() {
    var validData = true;
    tripOverviewNames.forEach(fieldName => {
        var field = document.forms["booking-form"][fieldName];
        var value = field.value;
        if (value == "") {
            field.classList.add("invalid-input");
            validData = false;
        }
    });

    return validData;
}

// validating the trip addons tab
function validateTripAddons() {
    var validData = true;
    var field = document.forms["booking-form"]["cookToolsEntry"];
    var value = field.value;

    if (value == "") {
        field[0].parentNode.classList.add("invalid-input");
        validData = false;
    }

    return validData;
}

// validating the terms and conditions tab
function validateTAndC() {
    var validData = true;
    tAndCNames.forEach(fieldName => {
        var field = document.forms["booking-form"][fieldName];
        var value = field.checked;

        if (!value) {
            field.parentNode.classList.add("invalid-input");
            validData = false;
        }
    });

    return validData;
}

function displayReviewData() {
    for (const element in fieldReviewMap) {
        var elementObject = document.forms["booking-form"][element];
        var result = "";

        if (elementObject.type == "date") {
            var currentDate = new Date(elementObject.value);
            result = `${daysOfWeek[currentDate.getUTCDay()]} ${currentDate.getDate()} ${monthsOfYear[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        } else if (elementObject.type == "select-one") {
            var selectOptions = elementObject.options;
            result = selectOptions[elementObject.selectedIndex].innerHTML;
        } else {
            result = elementObject.value;
        }
        
        document.getElementById(fieldReviewMap[element]).innerHTML = result;
    }

    // creating the captcha
    var captchaDisplay = document.getElementById("captcha-display");
    captchaColor = randomColor();
    captchaDisplay.innerHTML = captchaColor;
}

function testCaptcha() {
    var userEnteredData = document.getElementById("captcha-color").value;
    if (userEnteredData == captchaColor) return true;
    return false;
    
}

function removeClass(element) {
    element.classList.remove('invalid-input');
}

function randomColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var hexCode = `#${red.toString(16).padStart(2, "0")}${green.toString(16).padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;
    return hexCode;
}

function testSubmit() {
    if (!testCaptcha()) {
        window.alert("The captcha question does not match. Please try again.");
        return;
    }

    var pagesDataValidity = [!validatePersonalDetails(), !validateTripDetails(), !validateTripAddons(), !validateTAndC()];
    if (pagesDataValidity.includes(false)) {
        window.alert("There are pages with invalid data. Some how they didn't get picked up in our earlier checks. \nPlease try again.");
        return;
    } 
    
    document.forms["booking-form"].submit();
}