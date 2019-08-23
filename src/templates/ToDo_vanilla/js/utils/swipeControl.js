export const swipeConstructor = ( target, fn ) => {
  const SLIDE_RANGE = 80;
  let x1, x2, delta;

  target.addEventListener( 'touchstart', ( e ) => { x1 = e.touches[0].pageX } );
  target.addEventListener( 'touchend', ( e ) => {
    x2 = e.changedTouches[0].pageX;
    delta = x2 - x1;
    fn( delta, SLIDE_RANGE, e );
  });
}

// because change don't triggered, when change smth by js. Need call it
const changeEvent = new Event( 'change' );

const radios = [ ...document.querySelectorAll( 'input[type="radio"]' )];

const swipeControlType = ( () => swipeConstructor( window, ( delta, SLIDE_RANGE, e ) => {
    const index = radios.findIndex( radio => radio.checked );

    const target = e.target.tagName.toLowerCase();
    if ( target === 'li' ) return;

    if ( !radios[0].checked && delta > SLIDE_RANGE ) {
      radios[ index - 1 ].checked = true;
      radios[ index - 1 ].dispatchEvent( changeEvent );
    } else if ( !radios[ radios.length - 1 ].checked && delta < -SLIDE_RANGE ) {
      radios[ index + 1 ].checked = true;
      radios[ index + 1 ].dispatchEvent( changeEvent );
    }
  },
) )();