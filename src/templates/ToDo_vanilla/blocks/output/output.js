;'use strict';

import { default as data } from '../../js/utils/data';
import { createItem } from '../+list/list';

const TABLET_SCREEN_WIDTH = 960;

const outputCols = [ ...document.querySelectorAll( '.output__col' ) ];
const template = document.querySelector( '#output-block' )
  .content.querySelector( '.output__block' );

export const output = ( block ) => {
  if ( window.innerWidth > TABLET_SCREEN_WIDTH ) {
    outputCols.sort( ( a, b ) => a.scrollHeight < b.scrollHeight ? -1 : 1 );
  }

  outputCols[0].insertBefore( block, outputCols[0].firstElementChild );
}

// initial output

export const initialOutput = () => {
  const localData = data.read();

  if ( localData.length ) {
    for ( const lists of localData ) {
      const block = template.cloneNode( true );
      const btnRemove = block.querySelector( '.output__remove' );
      const btnSave = block.querySelector( '.output__save' );
      const list = block.querySelector( 'ul' );

      block.id = lists.id;
      list.classList.add( lists.type );

      for ( const listItem of lists.items ) {
        const item = createItem( lists.type, list, listItem.classList );
        const checkbox = item.querySelector( '.checklist__checkbox' );
        const text = document.createTextNode( listItem.text );
        
        if ( checkbox ) checkbox.checked = listItem.status;
        
        item.appendChild( text );
        list.appendChild( item );
      }
      output( block );

      btnRemove.addEventListener( 'click', data.remove.bind( null, block, lists.type ) );
      btnSave.addEventListener( 'click', data.update.bind( null, block, lists.type ) );
    }
  };
}

let initialWidth = window.innerWidth;

const resizeRender = () => {

  if ( ( initialWidth >= TABLET_SCREEN_WIDTH && window.innerWidth < TABLET_SCREEN_WIDTH ) 
    || ( initialWidth <= TABLET_SCREEN_WIDTH && window.innerWidth > TABLET_SCREEN_WIDTH ) ) {

      for ( const col of outputCols ) {
        col.innerHTML = '';
      }
      initialOutput();
      initialWidth = window.innerWidth;
  }
}

const DELAY = 100;
let timeout;

export const setWindowResizeRender = () => {
  window.addEventListener( 'resize', () => {
    clearTimeout( timeout );

    timeout = setTimeout( resizeRender, DELAY );
  });
}