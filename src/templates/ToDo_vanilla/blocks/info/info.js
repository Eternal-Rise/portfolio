const btnShow = document.querySelector( '.info' );

const popup = document.querySelector( '.info-popup' );
// const popupContent = popup.querySelector( '.info-popup__container' );
const btnHide = popup.querySelector( '.info-popup__hide' );

const showPopup = () => {
  popup.classList.add( '_active' );
  window.addEventListener( 'keydown', hidePopupByPressEsc);
};


const hidePopup = () => {
  popup.classList.remove( '_active' );
  window.removeEventListener( 'keydown', hidePopupByPressEsc );
};

const ESC_KEY_CODE = 27;
const hidePopupByPressEsc = ( e ) => {
  if ( e.keyCode === ESC_KEY_CODE ) hidePopup();
};

btnShow.addEventListener( 'click', showPopup );
btnHide.addEventListener( 'click', hidePopup );

popup.addEventListener( 'click', (e) => {
  if ( e.target.classList.contains( 'info-popup' ) ) hidePopup();
});
