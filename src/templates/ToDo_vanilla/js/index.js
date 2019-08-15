;'use strict';

console.log("i'm running");

// short querySelector
const $ = (elem, parent = undefined) => parent ? parent.querySelector(elem) : document.querySelector(elem);
const $All = (elem, parent = undefined) => parent ? parent.querySelectorAll(elem) : document.querySelectorAll(elem);

// 1. Кнопки - нотатка, список, чекліст - які показивутимуть відповідну форму
// 2. 

const findLevel = item => item.classList.value.match(/_level-[1-9]/)[0];
const data = JSON.parse(localStorage.getItem('data')) || {};
const output = $('.output');

const list = $('.list');
const item = $('.list__item', list);

const createItem = (list, e) => {
  
  if (!e.shiftKey && e.keyCode === 13) {
    e.preventDefault();

    const level = findLevel(e.target);
    const newItem = document.createElement('li');
    
    newItem.addEventListener('keydown', createItem.bind(null, list));
    newItem.addEventListener('keydown', deleteItem);
    newItem.addEventListener('keydown', shiftItem);
    newItem.addEventListener('paste', pasteText);

    newItem.classList.add('list__item', level);

    // idk. wanna string
    newItem.contentEditable = 'true';
    
    list.insertBefore(newItem, e.target.nextElementSibling);
    newItem.focus();
  }
}

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

const pasteText = e => {
  // console.log(e.keyCode);
  let paste = (e.clipboardData || window.clipboardData).getData('text');
  e.preventDefault();
  e.target.ownerDocument.execCommand("insertText", false, paste);
}

item.addEventListener('keydown', createItem.bind(null, list));
item.addEventListener('keydown', deleteItem);
item.addEventListener('keydown', shiftItem);
item.addEventListener('paste', pasteText);

const form = $('.form');
const formFileds = $('.form__fields');
const submit = $('.form__submit');

submit.addEventListener('click', e => {
  e.preventDefault();

  const list = $('.list');
  // cut list to output
  output.insertBefore(list, output.firstElementChild);

  // create new list & item
  const newList = document.createElement('ol');
  const newItem = document.createElement('li');

  newList.classList.add('list');
  newList.appendChild(newItem);
  formFileds.appendChild(newList);

  newItem.addEventListener('keydown', createItem.bind(null, newList));
  newItem.addEventListener('keydown', deleteItem);
  newItem.addEventListener('keydown', shiftItem);
  newItem.addEventListener('paste', pasteText);

  newItem.classList.add('list__item', '_level-1');

  // idk. wanna string
  newItem.contentEditable = 'true';

  newItem.focus()


  // save to localStorage
  const items = [...$All('.list__item', list)];

  if (!Array.isArray(data.list)) { data.list = [] };

  for (const item of items) {
    data.list.push({
      text: item.textContent,
      classList: item.classList.value.split(' '),
    });
  }
  localStorage.setItem('data', JSON.stringify(data));
});


if (Object.keys(data)) {

  const list = document.createElement('ol');
  for ( const dataItem of data.list ) {

    const item = document.createElement('li');

    list.classList.add('list');
    list.appendChild(item);
    
    item.addEventListener('keydown', createItem.bind(null, list));
    item.addEventListener('keydown', deleteItem);
    item.addEventListener('keydown', shiftItem);
    item.addEventListener('paste', pasteText);
    
    item.classList.add(...dataItem.classList);
    item.textContent = dataItem.text;

    // idk. wanna string
    item.contentEditable = 'true';
  }
  output.appendChild(list);
}




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