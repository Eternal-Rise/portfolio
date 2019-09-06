export const swipeConstructor = ( target, fn ) => {
  const SLIDE_RANGE = 80;
  let x1, x2, delta;

  target.addEventListener( 'touchstart', ( e ) => { x1 = e.touches[0].pageY; });
  target.addEventListener( 'touchend', ( e ) => {
    x2 = e.changedTouches[0].pageY;
    delta = x2 - x1;
    fn( delta, SLIDE_RANGE, e );
  });
};
