const slides = document.querySelectorAll('.slider__item');
const changeSlideBtn = document.querySelector('.slider-nav__btn');
const timeline = document.querySelector('.slider-nav__progress');
const timelineValue = timeline.querySelector('.progress__value');

// const step = 100 / (slides.length - 1);

let isForwardDirection = true;
let i = 0;

const changeSlide = () => {
  if (isForwardDirection) {
    slides[i].classList.remove('_active');
    slides[i + 1].classList.add('_active');
    // progressValue.style.width = `${step * (i + 1)}%`;

    i++;
    if (i === slides.length - 1) {
      isForwardDirection = false;
      changeSlideBtn.classList.add('_prev');
    }
  } else {
    slides[i].classList.remove('_active');
    slides[i - 1].classList.add('_active');
    // progressValue.style.width = `${step * (i - 1)}%`;
    i--;
    if (i === 0) {
      isForwardDirection = true;
      changeSlideBtn.classList.remove('_prev');
    }
  }
};

window.addEventListener('load', () => {

  // 5s + 50sm for reset _loading;
  const SLIDE_DURATION = 5050;
  const INTRO_DURATION = 3250;
  let autoChangeSlide;

  const resetTimeLineValue = () => {
    timelineValue.classList.remove('_loading');
    setTimeout(() => timelineValue.classList.add('_loading'), 50);
  };

  setTimeout(() => {
    autoChangeSlide = setTimeout(function fn() {
      resetTimeLineValue();
      changeSlide();
      autoChangeSlide = setTimeout(fn, SLIDE_DURATION);
    }, SLIDE_DURATION);

    timelineValue.classList.add('_loading');
  }, INTRO_DURATION);

  changeSlideBtn.addEventListener('click', changeSlide);
  changeSlideBtn.addEventListener('click', () => {
    resetTimeLineValue();
    clearInterval(autoChangeSlide);

    autoChangeSlide = setTimeout(function fn() {
      resetTimeLineValue();
      changeSlide();
      autoChangeSlide = setTimeout(fn, SLIDE_DURATION);
    }, SLIDE_DURATION);
  });
});
