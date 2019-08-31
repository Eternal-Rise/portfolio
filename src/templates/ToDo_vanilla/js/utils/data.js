import cloneDeep from 'clone-deep';

export const read = () =>
  ( JSON.parse( window.localStorage.getItem( 'data' ) ) || [] );

export const getInput = ( list, type, id ) => {
  const date = new Date();
  const items = [...list.querySelectorAll( `.${type}__item` )];

  const input = {
    date,
    id: id ? id : `list-${Math.random().toString(36).substr( 2, 9 )}`,
    items: [],
    type,
  };

  for ( const item of items ) {
    const checkbox = item.querySelector( '.checklist__checkbox' );
    const inputField = item.querySelector( '.inputField' );

    input.items.push({
      classList: item.classList.value.split(' '),
      content: [...inputField.childNodes].map( i => ( i.nodeName === '#text' ?
        i = i.textContent : i = 'br' )),
      status: checkbox ? checkbox.checked : undefined,
    });
  }
  return input;
};

export const getIndex = ( data, id ) =>
  data.findIndex( item => ( item.id === id ));

export const save = ( data ) => {
  localStorage.setItem( 'data', JSON.stringify( data ));
};

export const push = ( data, buffer ) => {
  data.push( buffer );
  save( data );
};

export const update = ( block, type ) => {
  const data = read();
  const list = block.querySelector( 'ul' );
  const inputData = getInput( list, type, block.id );
  const index = getIndex( data, block.id );

  data[ index ] = cloneDeep( inputData );
  save( data );
};

export const remove = ( block ) => {
  const data = read();
  const index = getIndex( data, block.id );

  if ( index >= 0 ) {
    block.remove();
    data.splice( index, 1 );
    save( data );
  }
};

export default { getIndex, getInput, read, remove, push, save, update };
