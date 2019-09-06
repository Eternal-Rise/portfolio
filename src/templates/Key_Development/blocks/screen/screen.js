import { swipeConstructor } from '../../js/utils/swipeConstructor';

const header = document.querySelector('.header');
const screen = document.querySelector('.screen');
const screenContainer = screen.querySelector('.screen__container');
const screenHeader = screen.querySelector('.screen-header');
const screenHeaderChilds = [...screenHeader.querySelector('.inner').children];
const btnScroll = screenHeader.querySelector('.btn-scroll');
const overlay = document.querySelector('.overlay');

const screenInfoChilds = [...screen.querySelector('.screen__info').children];
const screenContentChilds = [...screen.querySelector('.screen__content')
  .children];

let isScreenHidden = true;
let isScreenShown = false;

const showScreen = () => {
  screen.classList.remove('_hidden');

  screenHeaderChilds.forEach(child => child.classList.add('fade-out'));
  screenHeader.classList.remove('_initial');
  screenHeader.classList.remove('slide-in');
  screenHeader.classList.add('_active');
  screen.classList.add('_active');

  const DELAY = 2300; // time for animate screen
  const changeHeader = setTimeout(() => {
    header.classList.add('_active');
    header.classList.add('_alt');
    overlay.classList.add('_alt');
    clearTimeout(changeHeader);
  }, DELAY);

  const changeInfo = setTimeout(() => {
    screenInfoChilds.forEach(child => child.classList.add('fade-in'));
    clearTimeout(changeInfo);
  }, DELAY);

  const changeContent = setTimeout(() => {
    screenContentChilds.forEach(child => child.classList.add('fade-in'));
    screenContainer.style.backgroundColor = 'transparent';
    screenHeader.classList.add('_transparent');
    isScreenShown = true;
    clearTimeout(changeContent);
  }, DELAY + 500);

  isScreenHidden = false;
};

const hideScreen = () => {
  screenContainer.style.backgroundColor = '#fff';
  screenHeader.classList.remove('_transparent');
  header.classList.remove('_active');
  header.classList.remove('_alt');
  overlay.classList.remove('_alt');
  screen.classList.remove('_active');
  screen.classList.add('_hidden');

  const changeScreenHeader = setTimeout(() => {
    screenHeader.classList.remove('_active');
    screenHeader.classList.add('_initial');

    screenHeaderChilds.forEach(child => {
      child.classList.remove('first-fade-in');
      child.classList.remove('fade-out');
      child.classList.add('fade-in');
    });
    clearTimeout(changeScreenHeader);

    isScreenHidden = true;
  }, 750);



  isScreenShown = false;
};

btnScroll.addEventListener('click', showScreen);
window.addEventListener('load', () => {
  const DELAY = 2800; // time for initial animation

  screenHeader.classList.add('_slide-in');
  screenHeaderChilds.forEach(child => child.classList.add('first-fade-in'));

  setTimeout(() => {
    window.addEventListener('wheel', (e) => {
      const isScrollDown = e.deltaY > 0;

      if (isScrollDown && isScreenHidden) showScreen();
    });
  }, DELAY);
});

window.addEventListener('wheel', (e) => {
  const isScrollUp = e.deltaY < 0;
  if (isScrollUp && isScreenShown) hideScreen();
});

(() => swipeConstructor(window, (delta, SLIDE_RANGE) => {
  if (delta > SLIDE_RANGE && isScreenShown) hideScreen();
  else if (delta < -SLIDE_RANGE && isScreenHidden) showScreen();
}))();
