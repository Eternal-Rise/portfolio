const nav = () => {
  const btnShow = document.querySelector('.navbar__btn');
  const btnHide = document.querySelector('.nav__btn');
  const nav = document.querySelector('.nav');
  const blur = document.getElementById('wrapper');

  btnShow.addEventListener('click', toggleMenu);
  btnHide.addEventListener('click', toggleMenu);

  btnShow.addEventListener('click', () => {
    btnHide.focus();
  });

  btnHide.addEventListener('click', () => {
    btnShow.focus();
  });

  // hide nav by pressing "Escape"
  window.addEventListener('keydown', (e) => {
    if (nav.classList.contains('_show') && e.keyCode === 27) {
      toggleMenu()
    }
  });

  function toggleMenu() {
    document.body.classList.toggle('_overflow');
    nav.classList.toggle('_show');
    blur.classList.toggle('_on')
  }
}

export default nav;