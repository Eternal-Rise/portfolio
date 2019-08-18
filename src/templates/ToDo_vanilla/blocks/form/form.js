;'use strict';

import { createItem, createNewList } from '../+list/list';

const data = JSON.parse(localStorage.getItem('data')) || {};
const submit = document.querySelector( '.form__submit' );
const template = document.querySelector('#output-block')
.content.querySelector('.output__block');

const radios = [ ...document.querySelectorAll( 'input[type="radio"]' ) ];
let type;

for ( const radio of radios ) {

  // initial value for type
  if (radio.checked) type = radio.value;

  radio.addEventListener('change', () => { type = radio.value; });
}

const outputCols = [ ...document.querySelectorAll('.output__col') ];

const output = list => {
  outputCols.sort( ( a, b ) => a.scrollHeight < b.scrollHeight ? -1 : 1);
  outputCols[0].insertBefore( list, outputCols[0].firstElementChild );
}


const saveToLocalStorage = ( list ) => {
  const key = list.dataset.key;
  const items = [ ...list.querySelectorAll( `.${key}__item` ) ];
  const date = new Date();
  
  if ( !data[ key ] ) { data[ key ] = []; };
  
  const buffer = {
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
  
  const block = template.cloneNode( true );
  const tempList = block.querySelector( 'ul' );
  const list =  document.querySelector( `.${type}` );
  
  block.replaceChild( list, tempList );

  // TODO
  // Винести отримання data сюди, щоби передавати в output айдішник
  // move list to board
  output( block );
  
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
      const block = template.cloneNode( true );
      const list = block.querySelector( 'ul' );

      list.classList.add( lists.type );
  
      for ( const listItem of lists.items) {
        const item = createItem( lists.type, list, listItem.classList );
        const checkbox = item.querySelector('.checklist__checkbox');
        const text = document.createTextNode(listItem.text);
        
        if ( checkbox ) checkbox.checked = listItem.status;
        
        item.appendChild( text );
        list.appendChild( item );
      }
      output( block )
    }
  }
};