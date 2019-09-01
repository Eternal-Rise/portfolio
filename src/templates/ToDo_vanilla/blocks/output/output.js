import { default as data } from '../../js/utils/data';
import { note } from '../+list/note';
import { list } from '../+list/list';
import { checklist } from '../+list/checklist';

const TABLET_SCREEN_WIDTH = 960;

const outputCols = [...document.querySelectorAll( '.output__col' )];
const template = document.querySelector( '#output-block' )
  .content.querySelector( '.output__block' );

export const output = ( block ) => {
  if ( window.innerWidth > TABLET_SCREEN_WIDTH ) {
    outputCols.sort( ( a, b ) => ( a.scrollHeight < b.scrollHeight ? -1 : 1 ));
  }
  outputCols[0].insertBefore( block, outputCols[0].firstElementChild );
};

const render = ( constructor, list, items, type ) => {
  for ( const item of items ) {
    const { item: newItem } = constructor
      .createItem( type, list, item.classList );

    const checkbox = newItem.querySelector( '.checklist__checkbox' );
    const inputField =  newItem.querySelector( '.inputField' );
    if ( checkbox ) checkbox.checked = item.status;

    for ( const content of item.content ) {
      if ( content === 'br' ) {
        const br = document.createElement( 'br' );
        inputField.appendChild( br );
      } else {
        const text = document.createTextNode( content );
        inputField.appendChild( text );
      }
    }
    list.appendChild( newItem );
  }
};

// initial output
export const initialOutput = () => {
  const localData = data.read();

  if ( localData.length ) {
    for ( const lists of localData ) {
      const block = template.cloneNode( true );
      const btnRemove = block.querySelector( '.output__remove' );
      const btnSave = block.querySelector( '.output__save' );
      const newList = block.querySelector( 'ul' );
      const constructor = lists.type === 'note' ? note :
        lists.type === 'list' ? list : checklist;

      block.id = lists.id;
      newList.classList.add( lists.type );

      render( constructor, newList, lists.items, lists.type );
      output( block );

      btnRemove.addEventListener( 'click',
        data.remove.bind( null, block, lists.type ));
      btnSave.addEventListener( 'click',
        data.update.bind( null, block, lists.type ));
    }
  }
};

let initialWidth = window.innerWidth;

const resizeRender = () => {

  if ( ( initialWidth >= TABLET_SCREEN_WIDTH &&
    window.innerWidth < TABLET_SCREEN_WIDTH ) ||
    ( initialWidth <= TABLET_SCREEN_WIDTH &&
      window.innerWidth > TABLET_SCREEN_WIDTH )) {

    for ( const col of outputCols ) {
      col.innerHTML = '';
    }
    initialOutput();
    initialWidth = window.innerWidth;
  }
};

const DELAY = 100;
let timeout;

export const setWindowResizeRender = () => {
  window.addEventListener( 'resize', () => {
    clearTimeout( timeout );

    timeout = setTimeout( resizeRender, DELAY );
  });
};
