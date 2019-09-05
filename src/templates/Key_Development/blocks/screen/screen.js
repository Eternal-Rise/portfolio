const header = document.querySelector('.header');
const screen = document.querySelector('.screen');
const screenHeader = screen.querySelector('.screen-header');
const screenHeaderChilds = [...screenHeader.querySelector('.inner').children];
const btnScroll = screenHeader.querySelector('.btn-scroll');
const overlay = document.querySelector('.overlay');

const screenInfoChilds = [...screen.querySelector('.screen__info').children];
const screenContentChilds = [...screen.querySelector('.screen__content')
  .children];

let isScreenChanges = false;

const changeScreen = () => {
  screenHeaderChilds.forEach(child => child.classList.add('fade-out'));
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
    clearTimeout(changeContent);
  }, DELAY + 500);

  isScreenChanges = true;
};


btnScroll.addEventListener('click', changeScreen);
window.addEventListener('load', () => {
  screenHeader.classList.add('_slide-in');

  screenHeaderChilds.forEach(child => child.classList.add('fade-in'));

  const DELAY = 2800; // time for initial animation
  setTimeout(() => {
    window.addEventListener('wheel', (e) => {
      const isScrollDown = e.wheelDelta < 100;

      if (isScrollDown && !isScreenChanges) changeScreen();
    });
  }, DELAY);
});
