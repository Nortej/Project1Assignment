var startContainer, adContainer, car, wheels, texts, linkBackground, restartButton;

function adControlInit() {
    startContainer = document.getElementById('starting-background');
    adContainer = document.getElementById('hilux-ad');
    car = document.getElementById('hilux-car-container');
    wheels = document.querySelectorAll('.hilux-wheel');
    texts = document.querySelectorAll('.text-slide');
    linkBackground = document.getElementById('link-background');
    restartButton = document.getElementById('restart');

    window.setTimeout(restartAd, 9999);
}

function restartAd() {
    startContainer.removeAttribute('id');
    adContainer.removeAttribute('id');
    restartButton.removeAttribute('id');
    void startContainer.offsetWidth;
    adContainer.setAttribute('id', 'hilux-ad');
    startContainer.setAttribute('id', 'starting-background');
    adContainer.style.animationDirection = "reverse";
    adContainer.style.zIndex = 3;
    startContainer.style.animationDirection = "reverse";
    
    window.setTimeout(() => {
        startContainer.removeAttribute('id');
        adContainer.removeAttribute('id');
        restartButton.removeAttribute('id');
        car.removeAttribute('id');
        for (var i = 0; i < wheels.length; i++) {
            wheels.item(i).classList.remove('hilux-wheel');
        }
        for (var i = 0; i < texts.length; i++) {
            texts.item(i).classList.remove('text-slide');
        }
        void startContainer.offsetWidth;
        startContainer.setAttribute('id', 'starting-background');
        adContainer.setAttribute('id', 'hilux-ad');
        restartButton.setAttribute('id', 'restart');
        car.setAttribute('id', 'hilux-car-container');
        for (var i = 0; i < wheels.length; i++) {
            wheels.item(i).classList.add('hilux-wheel');
        }
        for (var i = 0; i < texts.length; i++) {
            texts.item(i).classList.add('text-slide');
        }
        adContainer.style.animationDirection = "normal";
        adContainer.style.zIndex = 0;
        startContainer.style.animationDirection = "normal";
    }, 2001);
}

// function restartAd() {
//     // hide the button
//     restartButton.style.animationDelay = "10s";
//     restartButton.style.animationPlayState = "running";
//     restartButton.style.animationName = "none";
//     window.setTimeout(() => {
//         restartButton.style.animationName = "";
//     });
//     // reverse the animation
//     var currentStartAnimation = startContainer.style.animation;
//     var currentAdAnimation = adContainer.style.animation;
//     adContainer.style.animation = "none";
//     startContainer.style.animation = "none";
//     adContainer.classList.add("hilux-ad-above");

//     // reversing the direction of the animation
//     window.setTimeout(() => {
//         adContainer.style.animation = currentAdAnimation;
//         adContainer.style.animationPlayState = "running";
//         adContainer.style.animationDirection = "reverse";
//         startContainer.style.animation = currentStartAnimation;
//         startContainer.style.animationPlayState = "running";
//         startContainer.style.animationDirection = "reverse";
//     });

//     // setting the animation to play forwards
//     window.setTimeout(() => {
//         startContainer.style.animation = currentStartAnimation;
//         startContainer.style.animationPlayState = "running";
//         adContainer.style.animation = currentAdAnimation;
//         adContainer.style.animationPlayState = "running";

//         changeAnimationName("none");

//         window.setTimeout(changeAnimationName, 1, "");  
//         adContainer.classList.remove("hilux-ad-above");
//     }, 2001);
// }

function changeAnimationName(newAnimationName) {
    startContainer.style.animationName = newAnimationName;
    adContainer.style.animationName = newAnimationName;
    car.style.animationName = newAnimationName;
    for (var i = 0; i < wheels.length; i++) {
        wheels.item(i).style.animationName = newAnimationName;
    }
    for (var i = 0; i < texts.length; i++) {
        texts.item(i).style.animationName = newAnimationName;
    }
    linkBackground.style.animationName = newAnimationName;
    restartButton.style.animationName = newAnimationName;
}