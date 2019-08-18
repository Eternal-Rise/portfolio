;'use strict';

console.log("i'm running");

import { default as constructor } from '../blocks/+list/list';
import '../blocks/form/form';

// 1. Кнопки - нотатка, список, чекліст - які показивутимуть відповідну форму
// 2. 

const initList = ( type ) => {
  const list = document.querySelector( `.${type}` );
  const item = constructor.createItem( type, list );

  list.appendChild( item );
}

initList( 'checklist' );
initList( 'list' );
initList( 'note' );