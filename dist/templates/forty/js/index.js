window.addEventListener('load', () => {

  let menuShow = document.getElementById('button-menu');
  let menuHide = document.getElementById('button-menu-close');
  let navOverlay = document.querySelector('.nav-overlay');
  let headerNav = document.querySelector('.header-main');

  menuShow.addEventListener('click', (e) => {
    headerNav.classList.remove('show');
    headerNav.classList.add('hide');
    navOverlay.classList.remove('hide');
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
    headerNav.classList.remove('hide');
    headerNav.classList.add('show');
  }
});