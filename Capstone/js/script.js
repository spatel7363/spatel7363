document.addEventListener('DOMContentLoaded', () => {
    const learnMoreButton = document.getElementById('learnMore');
    learnMoreButton.addEventListener('click', () => {
        window.location.href = '#about';
    });
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, idx) => {
        slide.style.display = (idx === index) ? 'block' : 'none';
    });
}

function moveSlide(step) {
    currentSlide += step;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    showSlide(currentSlide);
}

document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentSlide); // Show initial slide
    document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
    document.querySelector('.next').addEventListener('click', () => moveSlide(1));
});

let currentMenuSlideIndex = 0;

function moveMenuSlide(step) {
    const slides = document.querySelectorAll('.menu-slide');
    slides[currentMenuSlideIndex].classList.remove('active');
    currentMenuSlideIndex += step;
    if (currentMenuSlideIndex >= slides.length) {
        currentMenuSlideIndex = 0;
    } else if (currentMenuSlideIndex < 0) {
        currentMenuSlideIndex = slides.length - 1;
    }
    slides[currentMenuSlideIndex].classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    moveMenuSlide(0); // Initialize slider by showing the first slide
});
