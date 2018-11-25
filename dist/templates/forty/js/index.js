window.addEventListener('load', () => {

  let menuShow = document.getElementById('button-menu');
  let menuHide = document.getElementById('button-menu-close');
  let navOverlay = document.querySelector('.nav-overlay');

  menuShow.addEventListener('click', (e) => {
    navOverlay.classList.add('show');
  });

  menuHide.addEventListener('click', hideMenu);

  window.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      hideMenu()
    }
  });

  function hideMenu() {
    navOverlay.classList.remove('show');
    navOverlay.classList.add('hide');

    setTimeout( () => {
      navOverlay.classList.remove('hide');
    }, 600);
  }
});