import { swipeConstructor } from '../../js/utils/swipeControl';

const KEY_CODE = {
  ENTER: 13,
  BACKSPACE: 8,
  DELETE: 46,
  NUM_DEL: 110,
  '[': 219,
  ']': 221,
};

const inputFocus = ( e ) => {
  e.target.parentNode.classList.add( '_focused' );
};
const inputBlur = ( e ) => {
  e.target.parentNode.classList.remove( '_focused' );
};

export const createItem = ( type, list, classList ) => {
  const item = document.createElement( 'li' );
  const checkClassList = classList ? classList : [`${type}__item`, '_level-1'];
  item.classList.add( ...checkClassList );

  const inputField = document.createElement( 'span' );
  inputField.classList.add( 'inputField' );
  inputField.contentEditable = 'true';
  inputField.addEventListener( 'focus', inputFocus );
  inputField.addEventListener( 'blur', inputBlur );

  item.appendChild( inputField );

  if ( type !== 'note' ) {
    item.addEventListener( 'keydown', createNextItem.bind( null, type, list ));
    item.addEventListener( 'keydown', deleteItem.bind( null, type ));
    item.addEventListener( 'keydown', shiftItemByKeyboard );
    shiftItemByTouch( item );
  }

  item.addEventListener( 'paste', pasteText );

  if ( type === 'checklist' ) {

    const id = `c-${Math.random().toString( 36 ).substr( 2, 9 )}`;
    const checkbox = document.createElement( 'input' );
    const label = document.createElement( 'label' );

    checkbox.classList.add( 'checklist__checkbox', 'hidden' );
    checkbox.id = id;
    checkbox.type = 'checkbox';

    label.classList.add( 'checklist__label' );
    label.htmlFor = id;

    item.insertBefore( label, item.firstElementChild );
    item.insertBefore( checkbox, item.firstElementChild );

    checkbox.addEventListener( 'change',
      toggleChecked.bind( null, item, checkbox ));
  }

  return item;
};

const createNextItem = ( type, list, e ) => {
  if ( !e.shiftKey && e.keyCode === KEY_CODE.ENTER ) {
    e.preventDefault();

    const item = e.target.parentNode;
    const level = findLevel( item );
    const newItem = createItem( type, list, [ `${type}__item`, level ]);

    list.insertBefore( newItem, item.nextElementSibling );
    newItem.querySelector( '.inputField' ).focus();
  }
};

const deleteItem = ( e ) => {
  if (
    e.keyCode === KEY_CODE.BACKSPACE ||
    e.keyCode === KEY_CODE.DELETE ||
    ( e.shiftKey && e.keyCode === KEY_CODE.NUM_DEL )
  ) {
    const item = e.target.parentNode;
    const previous = item.previousElementSibling;

    if ( previous && e.target.textContent === '' ) {
      previous.querySelector( '.inputField' ).focus();
      item.remove();
    }
  }
};

const findLevel = item => item.classList.value.match(/_level-[1-9]/)[0];

const pasteText = ( e ) => {
  const paste = ( e.clipboardData || window.clipboardData ).getData( 'text' );
  e.preventDefault();
  e.target.ownerDocument.execCommand( 'insertText', false, paste );
};

const shiftItem = ( e, left, right, ctrlKey = true ) => {
  const item = e.target.parentNode;
  const previous = item.previousElementSibling;
  const next = item.nextElementSibling;

  if ( !previous ) return;

  if ( ctrlKey && ( left || right ) ) {

    const level = findLevel( item );
    const levelPrev = findLevel( previous );

    let num = +level.slice( -1 );
    const numNext = next ? +findLevel( next ).slice( -1 ) : num;
    const numPrev = +levelPrev.slice( -1 );

    if ( left ) num = shiftItemLeft( num, numNext );
    else num = shiftItemRight( num, numPrev );

    item.classList.replace( level, `${level.slice( 0, -1 )}${num}` );

    num - numPrev > 0 ? item.classList.add( '_reset' ) :
      item.classList.remove( '_reset' );
  }
};

const shiftItemLeft = ( num, numNext ) =>
  ( num > 1 && numNext - num < 1 ? --num : num );

const shiftItemRight = ( num, numPrev ) =>
  ( num < 9 && num - numPrev <= 0 ? ++num : num );

const shiftItemByKeyboard = ( e ) => {
  const left = e.keyCode === KEY_CODE[ '[' ];
  const right = e.keyCode === KEY_CODE[ ']' ];

  shiftItem( e, left, right, e.ctrlKey );
};

const shiftItemByTouch = ( target ) =>
  swipeConstructor( target, ( delta, SLIDE_RANGE, e ) => {
    const left = delta < -SLIDE_RANGE;
    const right = delta > SLIDE_RANGE;

    shiftItem( e, left, right );
  });

export const createNewList = ( type ) => {
  const formFileds = document.querySelector( '.form__fields' );
  const list = document.createElement( 'ul' );
  const item = createItem( type, list );

  formFileds.appendChild( list );
  list.appendChild( item );
  list.classList.add( type );
  list.dataset.key = type;
  item.querySelector( '.inputField' ).focus();
};

const toggleChecked = ( item, checkbox ) => {
  const targetLevel = +findLevel( item ).slice( -1 ); // '_level-x' => x

  let current = item;
  let currentLevel = +findLevel( item ).slice( -1 ); // '_level-x' => x
  let next = item.nextElementSibling;
  let prev = item.previousElementSibling;
  let parent = false;

  if ( next ) {
    let nextLevel = +findLevel( next ).slice( -1 ); // '_level-x' => x

    while ( next && nextLevel > targetLevel ) {
      next.querySelector( '.checklist__checkbox' ).checked = checkbox.checked;

      current = next;
      next = current.nextElementSibling;
      if ( next ) nextLevel = +findLevel( next ).slice( -1 ); // '_level-x' => x
    }
  }

  if ( prev && !checkbox.checked ) {
    let count = 0;
    let prevLevel = +findLevel( prev ).slice( -1 );

    while ( prev ) {
      if ( count === 1 ) break;
      if ( prevLevel === 1 ) count++;
      if ( prevLevel < currentLevel ) parent = true;
      if ( parent ) {
        prev.querySelector( '.checklist__checkbox' ).checked = false;
        parent = false;
      }

      current = prev;
      currentLevel = prevLevel;
      prev = current.previousElementSibling;
      if ( prev ) prevLevel = +findLevel( prev ).slice( -1 ); // '_level-x' => x
    }
  }

  if ( prev && checkbox.checked ) {

    // reset values
    current = item;
    currentLevel = +findLevel( item ).slice( -1 ); // '_level-x' => x
    next = current.nextElementSibling;
    parent = false;

    let count = 0;
    let prevLevel = +findLevel( prev ).slice( -1 ); // '_level-x' => x

    if ( next ) {
      let nextLevel = +findLevel( next ).slice( -1 ); // '_level-x' => x

      while ( next && count === 0 ) {
        if ( !next.querySelector( '.checklist__checkbox' ).checked ) return;

        current = next;
        next = current.nextElementSibling;

        if ( next ) nextLevel = +findLevel( next ).slice( -1 );
        if ( nextLevel === 1 ) count++;
      }
    }

    // reset counter
    count = 0;

    while ( prev && count === 0 ) {
      if ( prevLevel === 1 ) count++;
      if ( prevLevel < currentLevel ) parent = true;
      if ( parent ) {
        prev.querySelector( '.checklist__checkbox' ).checked = true;
        parent = false;
      }
      if ( !prev.querySelector( '.checklist__checkbox' ).checked ) break;

      current = prev;
      currentLevel = prevLevel;
      prev = current.previousElementSibling;
      if ( prev ) prevLevel = +findLevel( prev ).slice( -1 ); // '_level-x' => x
    }
  }
};
