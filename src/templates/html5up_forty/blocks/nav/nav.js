const nav = () => {
  const menuShow = document.querySelector('.navbar__btn');
  const menuHide = document.querySelector('.nav__btn');
  const nav = document.querySelector('.nav');
  const navbar = document.querySelector('.navbar');
  const blur = document.getElementById('wrapper');

  menuShow.addEventListener('click', () => {
    document.body.style.overflow = 'hidden';
    
    navbar.classList.remove('_show');
    navbar.classList.add('_hide');

    nav.classList.remove('_hide');
    nav.classList.add('_show');

    blur.classList.remove('_off')
    blur.classList.add('_on')
  });

  menuHide.addEventListener('click', hideMenu);

  window.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      hideMenu()
    }
  });

  function hideMenu() {
    document.body.style.overflow = '';

    nav.classList.remove('_show');
    nav.classList.add('_hide');

    navbar.classList.remove('_hide');
    navbar.classList.add('_show');

    blur.classList.remove('_on')
    blur.classList.add('_off')
  }
}

export default nav;