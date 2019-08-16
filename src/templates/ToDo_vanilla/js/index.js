;'use strict';

console.log("i'm running");

import { default as constructor } from '../blocks/list/list';
import '../blocks/form/form';

// 1. Кнопки - нотатка, список, чекліст - які показивутимуть відповідну форму
// 2. 

const initialList = () => {
  const list = document.querySelector( '.list' );
  const item = list.querySelector( '.list__item' );
  
  item.addEventListener('keydown', constructor.createNextItem.bind(null, list));
  item.addEventListener('keydown', constructor.deleteItem);
  item.addEventListener('keydown', constructor.shiftItem);
  item.addEventListener('paste', constructor.pasteText);
};

initialList();

// const input = $('#note');
// const output = $('#notes');
// const tNote = $('p',  $('#t-note').content );
// const submit = $('#submit');

// const notes = localStorage.getItem('notes') || '[]';
// const notesArr = JSON.parse(notes);

// const createNote = text => {
//   const note = tNote.cloneNode();
//   note.textContent = text;
//   return note;
// };

// for ( const note of notesArr ) {
//   output.appendChild( createNote( note ) );
// }

// submit.addEventListener('click', e => {
//   e.preventDefault();

//   if (input.value) {
//     const note = tNote.cloneNode();
//     note.textContent = input.value;
//     output.appendChild( note );

//     notesArr.push(input.value);
//     localStorage.setItem('notes', JSON.stringify(notesArr));
//     input.value = '';
//   }
// });