var startContainer, adContainer, car, wheels, texts, linkBackground, restartButton;

function adControlInit() {
    startContainer = document.getElementById('starting-background');
    adContainer = document.getElementById('hilux-ad');
    car = document.getElementById('hilux-car');
    wheels = document.getElementsByClassName('hilux-wheel');
    texts = document.getElementsByClassName('text-slide');
    linkBackground = document.getElementById('link-background');
    restartButton = document.getElementById('restart');
}

function restartAd() {
    // hide the button
    restartButton.style.animationDelay = "10s";
    restartButton.style.animationPlayState = "running";
    restartButton.style.animationName = "none";
    window.setTimeout(() => {
        restartButton.style.animationName = "";
    });
    // restartButton.style.opacity = 0;
    // reverse the animation
    var currentStartAnimation = startContainer.style.animation;
    var currentAdAnimation = adContainer.style.animation;
    adContainer.style.animation = "none";
    startContainer.style.animation = "none";
    adContainer.style.zIndex = 5;

    window.setTimeout(() => {
        adContainer.style.animation = currentAdAnimation;
        adContainer.style.animationPlayState = "running";
        adContainer.style.animationDirection = "reverse";
        startContainer.style.animation = currentStartAnimation;
        startContainer.style.animationPlayState = "running";
        startContainer.style.animationDirection = "reverse";
    });

    window.setTimeout(() => {
        adContainer.style.zIndex = 0;
        startContainer.style.animation = currentStartAnimation;
        startContainer.style.animationPlayState = "running";
        adContainer.style.animation = currentAdAnimation;
        adContainer.style.animationPlayState = "running";

        changeAnimationName("none");

        window.setTimeout(changeAnimationName, 1, "");    
    }, 2000);
}

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