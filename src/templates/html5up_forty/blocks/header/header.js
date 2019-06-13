import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();

const header = () => {

  if (window.location.pathname.search(/elements|generic/) === -1) {
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar');
    const btnScroll = document.getElementById('scroll');

    const navbarHeight = parseInt(window
      .getComputedStyle(navbar, null)
      .getPropertyValue("height"));      

    const offset = parseInt(window
      .getComputedStyle(header, null)
      .getPropertyValue("height"));

    const navbarScroll = () => {
      if (window.pageYOffset > navbarHeight) {
        navbar.classList.add('_hidden');
        
        if (window.pageYOffset >= (offset - navbarHeight)) {
          navbar.classList.add('_fixed');
          navbar.classList.remove('_hidden');
        }
      } else {
        navbar.classList.remove('_fixed');
        navbar.classList.remove('_hidden');
        }
      }

    window.addEventListener('scroll', () => {
      
      // Header parallax
      let scroll = window.pageYOffset || window.scrollY;
      header.style.backgroundPosition = `center -${scroll / 4}px`

      navbarScroll()
    });
      
    if (window.location.pathname.search(/index.html/) !== -1 || 
      window.location.pathname === "https://eternal-rise.github.io/html5up_forty/") {

      btnScroll.addEventListener('click', () => {
        window.scroll({
          top: offset - navbarHeight,
          left: 0,
          behavior: 'smooth'
        });
      });
    }

    // header animation

    window.addEventListener('load', () => {
      const header__inner = document.querySelector('.header__inner')

      header.classList.remove('_hiddenBackground');
      header__inner.classList.remove('_hidden');
      navbar.classList.remove('_opacity');
    });
  }
}

export default header;