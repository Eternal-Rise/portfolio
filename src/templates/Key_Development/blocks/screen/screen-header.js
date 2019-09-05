const screenHeader = document.querySelector('.screen-header');
const screenHeaderChilds = screenHeader.querySelector('.inner').children;

console.log(screenHeaderChilds);

window.addEventListener('load', () => {
  screenHeader.classList.add('_slide-in');

  for (let i = 0; i < screenHeaderChilds.length; i++) {
    screenHeaderChilds[i].classList.add('fade-in');
    // screenHeaderChilds[i].style.animation =
    //   `fade-in 1s cubic-bezier(.56,.97,.86,.9) ${3.5 + i / 5}s forwards`;
  }

  // setTimeout(() => {
  //   for (let i = screenHeaderChilds.length - 1; i >= 0; i--) {
  //     screenHeaderChilds[i].style.animation +=
  //       `fade-out 1s cubic-bezier(.56,.97,.86,.9) ${i / 5}s forwards`;
  //   }

  //   screenHeader.classList.add('_active');
  // }, 5000);
});
