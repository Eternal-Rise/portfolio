window.addEventListener('load', () => {

  window.addEventListener('scroll', () => {
    console.log(window.screen.height);
  })

  console.log(document.body.clientHeight, window.screen.height)

  const scroll = document.getElementsByClassName('scroll');
  let multiplier = 1;
  
  for (let i = 0; i < scroll.length; i++) {
    console.log(window.screen.height * multiplier)

    scroll[i].addEventListener('click', () => {
      window.scroll({
        top: window.screen.height * multiplier,
        left: 0, 
        behavior: 'smooth' 
      });
    });

    multiplier++
  }

})

