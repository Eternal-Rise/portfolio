window.addEventListener('load', () => {

  const scroll = document.getElementsByClassName('scroll');
  
  for (let i = 0; i < scroll.length; i++) {

    scroll[i].addEventListener('click', () => {
      window.scroll({
        top: window.screen.height * (i + 1),
        left: 0, 
        behavior: 'smooth' 
      });
    });

  }

})

