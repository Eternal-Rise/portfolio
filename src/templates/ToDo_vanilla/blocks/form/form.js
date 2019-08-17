;'use strict';

import { createItem, createNewList } from '../+list/list';

const data = JSON.parse(localStorage.getItem('data')) || {};
const output = document.querySelector( '.output' );
const submit = document.querySelector( '.form__submit' );

const radios = [ ...document.querySelectorAll( 'input[type="radio"' ) ];
let type;

for ( const radio of radios ) {

  // initial value for type
  if (radio.checked) type = radio.value;

  radio.addEventListener('change', () => { type = radio.value; });
}

const saveToLocalStorage = ( list ) => {
  const key = list.dataset.key;
  const items = [ ...list.querySelectorAll( `.${key}__item` ) ];
  const date = new Date();
  
  if ( !data[ key ] ) { data[ key ] = []; };
  
  const buffer = {
    classList: list.classList.value.split(' '),
    date,
    id: `list-${(+date).toString(16)}`,
    items: [],
    type,
  };

  if (type === 'checklist') {
    for (const item of items) {
      const checkbox = item.querySelector('.checklist__checkbox');

      buffer.items.push({
        classList: item.classList.value.split(' '),
        status: checkbox.checked,
        text: item.textContent,
      });
    }
  } else {
    for (const item of items) {
      buffer.items.push({
        classList: item.classList.value.split(' '),
        text: item.textContent,
      });
    }
  }
  data[ key ].push( buffer );
  localStorage.setItem( 'data', JSON.stringify( data ) );
}

submit.addEventListener( 'click', e => {
  e.preventDefault();

  const list =  document.querySelector( `.${type}` );
  
  // move list to board
  output.insertBefore( list, output.firstElementChild );
  
  // save to local storage
  saveToLocalStorage( list );

  // create new list
  createNewList( type );
});

// initial output
const keys = Object.keys(data)
if ( keys.length ) {
  
  for (const key of keys ) {
    for ( const lists of data[ key ] ) {
      const list = document.createElement( 'ol' );
      list.classList.add( ...lists.classList );
  
      for ( const listItem of lists.items) {
        const item = createItem( lists.type, list, listItem.classList );
        const checkbox = item.querySelector('.checklist__checkbox');
        const text = document.createTextNode(listItem.text);
        
        if ( checkbox ) checkbox.checked = listItem.status;
        
        item.appendChild( text );
        list.appendChild( item );
      }
      output.insertBefore( list, output.firstElementChild );
    }
  }
};