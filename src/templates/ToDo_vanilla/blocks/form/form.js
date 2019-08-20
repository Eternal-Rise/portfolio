;'use strict';

import { createItem, createNewList } from '../+list/list';
import { default as data } from '../../js/data';

const submit = document.querySelector( '.form__submit' );
const template = document.querySelector('#output-block')
  .content.querySelector('.output__block');

const radios = [ ...document.querySelectorAll( 'input[type="radio"]' ) ];
let type;

for ( const radio of radios ) {

  // initial value for type
  if ( radio.checked ) type = radio.value;

  radio.addEventListener( 'change', () => { type = radio.value; } );
}

const outputCols = [ ...document.querySelectorAll( '.output__col' ) ];

const output = ( block ) => {
  outputCols.sort( ( a, b ) => a.scrollHeight < b.scrollHeight ? -1 : 1);
  outputCols[0].insertBefore( block, outputCols[0].firstElementChild );
}

submit.addEventListener( 'click', e => {
  e.preventDefault();
  
  const list =  document.querySelector( `.${type}` );
  const localData = data.read();

  const block = template.cloneNode( true );
  const btnRemove = block.querySelector( '.output__remove' );
  const btnSave = block.querySelector( '.output__save' );
  const tempList = block.querySelector( 'ul' );
  
  block.replaceChild( list, tempList );
  
  // get data from list
  const inputData = data.getInput( list, type );

  // id to block for delete / update block | data
  block.id = inputData.id;
  
  // move list to board
  output( block );
  
  // hang event handlers
  btnRemove.addEventListener( 'click', data.remove.bind( null, block, type ) );
  btnSave.addEventListener( 'click', data.update.bind( null, block, type ) );
  
  // save to local storage
  data.push( localData, inputData );

  // create new list
  createNewList( type );
});

// initial output
const localData = data.read();
if ( localData.length ) {
  for ( const lists of localData ) {
    const block = template.cloneNode( true );
    const btnRemove = block.querySelector( '.output__remove' );
    const btnSave = block.querySelector( '.output__save' );
    const list = block.querySelector( 'ul' );

    block.id = lists.id;
    list.classList.add( lists.type );

    for ( const listItem of lists.items) {
      const item = createItem( lists.type, list, listItem.classList );
      const checkbox = item.querySelector('.checklist__checkbox');
      const text = document.createTextNode(listItem.text);
      
      if ( checkbox ) checkbox.checked = listItem.status;
      
      item.appendChild( text );
      list.appendChild( item );
    }
    output( block );

    btnRemove.addEventListener( 'click', data.remove.bind( null, block, lists.type ) );
    btnSave.addEventListener( 'click', data.update.bind( null, block, lists.type ) );
  }
};