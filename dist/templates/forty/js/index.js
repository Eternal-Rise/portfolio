window.addEventListener('load', () => {

// Show/hide navigation
  let menuShow = document.getElementById('button-menu');
  let menuHide = document.getElementById('button-menu-close');
  let navOverlay = document.querySelector('.nav-overlay');
  let headerNav = document.querySelector('.header-bar');
  let blur = document.getElementById('blur');

  menuShow.addEventListener('click', (e) => {
    headerNav.classList.remove('show');
    headerNav.classList.add('hide');
    navOverlay.classList.remove('hide');
    navOverlay.classList.add('show');
    blur.classList.remove('off')
    blur.classList.add('on')
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
    blur.classList.remove('on')
    blur.classList.add('off')
  }


  // Parallax under banner
  let banner = document.querySelector('.banner');

  window.addEventListener('scroll', () => {
    let scroll = window.pageYOffset;
    banner.style.backgroundPosition = `center ${scroll / 8}px`
  })

  // Scroll to tiles
  let btnScroll = document.getElementById('scroll');

  btnScroll.addEventListener('click', () => {
    
    let target = document.querySelector('.tiles');
    let offset = target.getBoundingClientRect().top;
    let headerNavHeight = parseInt(window
      .getComputedStyle(headerNav,null)
      .getPropertyValue("height"));

    window.scroll({
      top: offset - headerNavHeight,
      left: 0,
      behavior: 'smooth'
    });
  });
});
