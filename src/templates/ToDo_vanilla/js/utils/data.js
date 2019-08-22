;'use strict';

import cloneDeep from 'clone-deep';

export const read = () => ( JSON.parse(localStorage.getItem('data')) || [] );

export const getInput = ( list, type, id ) => {
  const date = new Date();
  const items = [ ...list.querySelectorAll( `.${type}__item` ) ];

  const input = {
    date,
    id: id ? id : `list-${ Math.random().toString(36).substr(2, 9) }`,
    items: [],
    type,
  };

  let checkbox;

  for ( const item of items ) {

    if ( type === 'checklist' ) {
      checkbox = item.querySelector( '.checklist__checkbox' );
    }
  
    input.items.push({
      classList: item.classList.value.split(' '),
      status: checkbox ? checkbox.checked : undefined,
      text: item.textContent,
    });
  }

  return input;
}

export const getIndex = ( data, id ) => {
  return data.findIndex( item => ( item.id === id ) );
}

export const push = ( data, buffer ) => {
  data.push( buffer );
  save( data );
}

export const save = ( data ) => {
  localStorage.setItem( 'data', JSON.stringify( data ) );
};

export const update = ( block, type ) => {
  const data = read();
  const list = block.querySelector( 'ul' );
  const inputData = getInput( list, type, block.id );
  const index = getIndex( data, block.id );

  data[ index ] = cloneDeep( inputData );
  save( data );
}

export const remove = ( block ) => {
  const data = read();
  const index = getIndex( data, block.id);

  if ( index >= 0) { 
    block.remove();
    data.splice( index, 1 );
    save( data );
  };
}

export default { getIndex, getInput, read, remove, push, save, update };