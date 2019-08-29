import { createNewList } from '../+list/list';
import { output } from '../output/output';
import { default as data } from '../../js/utils/data';

const submit = document.querySelector( '.form__submit' );
const template = document.querySelector( '#output-block' )
  .content.querySelector( '.output__block' );

const radios = [ ...document.querySelectorAll( 'input[type="radio"]' ) ];
let type;

const updateType = value => { type = value; };

for ( const radio of radios ) {

  // initial value for type
  if ( radio.checked ) type = radio.value;

  radio.addEventListener( 'change', updateType.bind( null, radio.value ));
}

submit.addEventListener( 'click', ( e ) => {
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
