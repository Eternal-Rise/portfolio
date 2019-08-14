;'use strict';

console.log("i'm running");

// short querySelector
const $ = (elem, parent = undefined) => parent ? parent.querySelector(elem) : document.querySelector(elem);
const $All = (elem, parent = undefined) => parent ? parent.querySelectorAll(elem) : document.querySelectorAll(elem);

// 1. Кнопки - нотатка, список, чекліст - які показивутимуть відповідну форму
// 2. 

const findLevel = item => item.classList.value.match(/_level-[1-9]/)[0];

const list = $('.list');
const item = $('.list__item', list);

const deleteItem = e => {
  if (e.keyCode === 8 || e.keyCode === 46) {
    const previous = e.target.previousElementSibling;

    if (e.target.textContent === '' && previous) {
      previous.focus();
      e.target.remove();
    }
  }
}

const shiftItem = e => {
  const previous = e.target.previousElementSibling;

  if ( previous && e.ctrlKey && (e.keyCode === 219 || e.keyCode === 221)) {
    
    const level = findLevel(e.target);
    const levelPrev = findLevel(previous);
    let num = +level.slice(-1);
    let numPrev = +levelPrev.slice(-1);

    e.keyCode === 219 && num > 1 ? num--
    : e.keyCode === 221 && num < 9 && num - numPrev <= 0 ? num++
    : num;

    e.target.classList.replace(level, `${level.slice(0, -1)}${num}`);
    
    num - numPrev > 0 ? e.target.classList.add('_reset')
    : e.target.classList.remove('_reset');

  }
}

const createItem = e => {
  
  if (e.keyCode === 13) {
    e.preventDefault();

    const level = findLevel(e.target);
    const newItem = document.createElement('li');
    
    newItem.addEventListener('keydown', createItem);
    newItem.addEventListener('keydown', deleteItem);
    newItem.addEventListener('keydown', shiftItem);

    newItem.classList.add('list__item', level);

    // idk. wanna string
    newItem.contentEditable = 'true';
    
    list.insertBefore(newItem, e.target.nextElementSibling);
    newItem.focus();
  }
}

item.addEventListener('keydown', createItem);
item.addEventListener('keydown', deleteItem);
item.addEventListener('keydown', shiftItem);




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