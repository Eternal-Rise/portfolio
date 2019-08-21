;'use strict';

let x1;
const radios = [ ...document.querySelectorAll( 'input[type="radio"]' )];
const slideRange = 80;

window.addEventListener( 'touchstart', (e) => { x1 = e.touches[0].pageX }, false );
window.addEventListener( 'touchend', (e) => {
  let x2 = e.changedTouches[0].pageX;
  const index = radios.findIndex( radio => radio.checked );

  if ( !radios[0].checked && ( x2 - x1 ) > slideRange ) {
    radios[index - 1].checked = true;
  } else if ( !radios[ radios.length - 1 ].checked && ( x1 - x2 ) > slideRange ) {
    radios[index + 1].checked = true;
  }

  }, false );
