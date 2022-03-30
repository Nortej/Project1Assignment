var mainWindow = document.getElementById("windows");
var windowElements = mainWindow.children;
var currentIndex = 0;
var numberOfWindows = windowElements.length;

var progressBar = document.getElementById("progress-bar");
var progressJumps = (1.0 / numberOfWindows) * 100;

function next() {
    if (currentIndex >= numberOfWindows - 1) { return; }

    setVisibility(windowElements[currentIndex], "hidden");
    currentIndex++;
    setVisibility(windowElements[currentIndex], "visible");
    updateProgressBar();
}

function previous() {
    if (currentIndex <= 0) { return; }

    setVisibility(windowElements[currentIndex], "hidden");
    currentIndex--;
    setVisibility(windowElements[currentIndex], "visible");
    updateProgressBar();
}

function setVisibility(window, visibility) {
    window.style.visibility = visibility;
}

function updateProgressBar() {
    progressBar.value = progressJumps * (currentIndex + 1);
}

setVisibility(windowElements[currentIndex], "visible");