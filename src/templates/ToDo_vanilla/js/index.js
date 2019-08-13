console.log("i'm running");

const $ = (elem, local = undefined) => local ? local.querySelector(elem) : document.querySelector(elem);
const $All = (elem, local = undefined) => local ? local.querySelectorAll(elem) : document.querySelectorAll(elem);

const input = $('#note');
const output = $('#notes');
const tNote = $('p',  $('#t-note').content );
const submit = $('#submit');

const notes = localStorage.getItem('notes') || '[]';
const notesArr = JSON.parse(notes);

const createNote = text => {
  const note = tNote.cloneNode();
  note.textContent = text;
  return note;
};

for ( const note of notesArr ) {
  output.appendChild( createNote( note ) );
}

submit.addEventListener('click', e => {
  e.preventDefault();

  if (input.value) {
    const note = tNote.cloneNode();
    note.textContent = input.value;
    output.appendChild( note );

    notesArr.push(input.value);
    localStorage.setItem('notes', JSON.stringify(notesArr))
  }
});