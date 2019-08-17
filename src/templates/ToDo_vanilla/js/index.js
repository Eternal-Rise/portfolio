;'use strict';

console.log("i'm running");

import { default as constructor } from '../blocks/+list/list';
import '../blocks/form/form';

// 1. Кнопки - нотатка, список, чекліст - які показивутимуть відповідну форму
// 2. 


const initList = ( type ) => {

  const list = document.querySelector( `.${type}` );
  const item = document.querySelector( `.${type}__item` );

  if ( type !== 'note' ) {
    item.addEventListener('keydown', constructor.createNextItem.bind(null, type, list));
    item.addEventListener('keydown', constructor.deleteItem);
    item.addEventListener('keydown', constructor.shiftItem);
  }

  item.addEventListener('paste', constructor.pasteText);
}


initList( 'checklist' );
initList( 'list' );
initList( 'note' );

// init checklist checkbox + label
const checkbox = document.querySelector('.checklist__checkbox');
const id = `f${(+new Date).toString(16)}`;
const label = document.querySelector('.checklist__label');

checkbox.id = id;
label.htmlFor = id;