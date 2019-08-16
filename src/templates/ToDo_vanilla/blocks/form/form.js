;'use strict';

import { createItem, createNewList } from '../list/list';

const data = JSON.parse(localStorage.getItem('data')) || {};
const output = document.querySelector( '.output' );
const submit = document.querySelector( '.form__submit' );

const saveToLocalStorage = ( list ) => {
  const items = [ ...list.querySelectorAll( '.list__item' ) ];
  const buffer = [];

  if ( !Array.isArray( data.list ) ) { data.list = [] };

  for (const item of items) {
    buffer.push({
      text: item.textContent,
      classList: item.classList.value.split(' '),
    });
  }
  data.list.push( buffer );
  localStorage.setItem( 'data', JSON.stringify( data ) );
}

submit.addEventListener( 'click', e => {
  e.preventDefault();

  const list =  document.querySelector( '.list' );
  
  // move list to board
  output.insertBefore( list, output.firstElementChild );
  
  // save to local storage
  saveToLocalStorage( list );

  // create new list
  createNewList();

});

// initial output
if ( Object.keys(data).length ) {
  
  for ( const dataItems of data.list ) {
    const list = document.createElement( 'ol' );
    list.classList.add( 'list' );

    for ( const dataItem of dataItems) {
      const item = createItem( list, dataItem.classList );
      item.textContent = dataItem.text;
      list.appendChild( item );
    }
    output.appendChild( list );
  }
};