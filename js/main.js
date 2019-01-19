window.addEventListener('load', () => {

  const scroll = document.getElementsByClassName('scroll');
  const slide = document.querySelectorAll('.slide');
  
  for (let i = 0; i < scroll.length; i++) {

    scroll[i].addEventListener('click', () => {
      window.scroll({
        top: scrollHeight(i),
        left: 0, 
        behavior: 'smooth' 
      });
    });

  }

  function scrollHeight(i) {
    let height = 0;

    for (let j = 0; j <= i; j++) {
      height += slide[j].scrollHeight;
    }

    return height;
  }

})

