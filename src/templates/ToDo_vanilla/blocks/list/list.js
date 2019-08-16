;'use strict';

const KEY_CODE = {
  ENTER: 13,
  BACKSPACE: 8,
  DELETE: 46,
  NUM_DEL: 110,
  '[': 219,
  ']': 221,
};

export const createItem = ( list, classList = [ 'list__item', '_level-1' ] ) => {
  const item = document.createElement( 'li' );
  item.classList.add( ...classList );
    
  item.addEventListener( 'keydown', createNextItem.bind(null, list) );
  item.addEventListener( 'keydown', deleteItem );
  item.addEventListener( 'keydown', shiftItem );
  item.addEventListener( 'paste', pasteText );

  // idk. wanna string
  item.contentEditable = 'true';

  return item;
};

export const createNextItem = ( list, e ) => {
  if ( !e.shiftKey && e.keyCode === KEY_CODE.ENTER ) {
    e.preventDefault();

    const level = findLevel( e.target );      
    const item = createItem( list, [ 'list__item', level ] );
    
    list.insertBefore( item, e.target.nextElementSibling );
    item.focus();
  }
};

export const deleteItem = e => {
  if ( 
    e.keyCode === KEY_CODE.BACKSPACE
    || e.keyCode === KEY_CODE.DELETE
    || ( e.shiftKey && e.keyCode === KEY_CODE.NUM_DEL )
  ) {
    const previous = e.target.previousElementSibling;

    if ( previous && e.target.textContent === '' ) {
      previous.focus();
      e.target.remove();
    }
  }
};

export const findLevel = item => item.classList.value.match(/_level-[1-9]/)[0];

export const pasteText = e => {
  const paste = (e.clipboardData || window.clipboardData).getData('text');
  e.preventDefault();
  e.target.ownerDocument.execCommand("insertText", false, paste);
};

export const shiftItem = e => {
  const previous = e.target.previousElementSibling;

  if ( 
    previous && e.ctrlKey 
    && ( e.keyCode === KEY_CODE[ '[' ] || e.keyCode === KEY_CODE[ ']' ] )
  ) {
    
    const level = findLevel(e.target);
    const levelPrev = findLevel(previous);
    const numPrev = +levelPrev.slice(-1);
    let num = +level.slice(-1);
    
    if ( e.keyCode === KEY_CODE[ '[' ] ) num = shiftItemLeft( e, num );
    else num = shiftItemRight( e, num, numPrev );
    
    e.target.classList.replace(level, `${level.slice(0, -1)}${num}`);
    
    num - numPrev > 0 ? e.target.classList.add('_reset')
    : e.target.classList.remove('_reset');
  }
};

const shiftItemLeft = ( e, num ) =>
  ( e.keyCode === KEY_CODE[ '[' ] && num > 1 ? --num : num );

const shiftItemRight = ( e, num, numPrev ) =>
  ( e.keyCode === KEY_CODE[ ']' ] && num < 9 && num - numPrev <= 0 ? ++num : num );

export const createNewList = () => {
  const formFileds = document.querySelector( '.form__fields' );
  const list = document.createElement( 'ol' );
  const item = createItem( list );
  
  formFileds.appendChild( list );
  list.appendChild( item );
  list.classList.add('list');
  item.focus();
}

export default { createItem, createNextItem, deleteItem, findLevel, pasteText, shiftItem };