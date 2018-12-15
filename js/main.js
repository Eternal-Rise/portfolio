window.addEventListener('load', () => {

  const scroll = document.getElementsByClassName('scroll');
  const slide = document.querySelector('.slide');
  console.log(window.screen.height)
  
  for (let i = 0; i < scroll.length; i++) {

    scroll[i].addEventListener('click', () => {
      window.scroll({
        top: slide.clientHeight * (i + 1),
        left: 0, 
        behavior: 'smooth' 
      });
    });

  }

})

