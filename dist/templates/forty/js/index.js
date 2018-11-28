window.addEventListener('load', () => {

// Show/hide navigation
  let menuShow = document.getElementById('button-menu');
  let menuHide = document.getElementById('button-menu-close');
  let navOverlay = document.querySelector('.nav-overlay');
  let headerNav = document.querySelector('.header-bar');
  let blur = document.getElementById('wrapper');

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

  if (window.location.pathname.search(/index|landing.html/) != -1) {
    
    // Parallax under banner
    let banner = document.querySelector('.banner');

    window.addEventListener('scroll', () => {
      let scroll = window.pageYOffset;
      banner.style.backgroundPosition = `center -${scroll / 4}px`

      headerScroll()
    })

    // Scroll to end of banner
    let btnScroll = document.getElementById('scroll');
    
    const headerNavHeight = parseInt(window
      .getComputedStyle(headerNav,null)
      .getPropertyValue("height"));

    const offset = parseInt(window
      .getComputedStyle(banner,null)
      .getPropertyValue("height"));

    function headerScroll() {
      if (window.pageYOffset > headerNavHeight) {
        headerNav.style.transform = 'translateY(-100%)';
        headerNav.style.webkitTransform = 'translateY(-100%)';
        
        if (window.pageYOffset >= (offset - headerNavHeight)) {
          headerNav.classList.add('fixed')
          headerNav.style.transform = 'translateY(0)';
          headerNav.style.webkitTransform = 'translateY(0)';
        }
      } else if (window.pageYOffset <= headerNavHeight) {
        headerNav.classList.remove('fixed')
        headerNav.style.transform = 'translateY(0)';
        headerNav.style.webkitTransform = 'translateY(0)';
        }
      }
      
      if (window.location.pathname.search(/index.html/) != -1) {
        btnScroll.addEventListener('click', () => {
          window.scroll({
            top: offset - headerNavHeight,
            left: 0,
            behavior: 'smooth'
          });
        });
      }
    }
  });
  