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