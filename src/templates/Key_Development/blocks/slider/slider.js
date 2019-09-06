const slides = document.querySelectorAll('.slider__item');
const changeSlideBtn = document.querySelector('.slider-nav__btn');
const progress = document.querySelector('.slider-nav__progress');
const progressValue = progress.querySelector('.progress__value');

const step = 100 / (slides.length - 1);

let isForwardDirection = true;
let i = 0;

changeSlideBtn.addEventListener('click', () => {

  if (isForwardDirection) {
    slides[i].classList.remove('_active');
    slides[i + 1].classList.add('_active');
    progressValue.style.width = `${step * (i + 1)}%`;

    i++;
    if (i === slides.length - 1) {
      isForwardDirection = false;
      changeSlideBtn.classList.remove('_next');
      changeSlideBtn.classList.add('_prev');
    }
  } else {
    slides[i].classList.remove('_active');
    slides[i - 1].classList.add('_active');
    progressValue.style.width = `${step * (i - 1)}%`;
    i--;
    if (i === 0) {
      isForwardDirection = true;
      changeSlideBtn.classList.remove('_prev');
      changeSlideBtn.classList.add('_next');
    }
  }
});
