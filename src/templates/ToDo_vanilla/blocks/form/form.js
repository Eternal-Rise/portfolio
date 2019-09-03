import { note } from '../+list/note';
import { list } from '../+list/list';
import { checklist } from '../+list/checklist';
import { output } from '../output/output';
import { default as data } from '../../js/utils/data';

const formFields = document.querySelector( '.form__fields' );
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

  const currentList =  document.querySelector( `.${type}` );
  const localData = data.read();

  const block = template.cloneNode( true );
  const btnRemove = block.querySelector( '.output__remove' );
  const btnSave = block.querySelector( '.output__save' );
  const newList = block.replaceChild( currentList, block.querySelector( 'ul' ));

  const constructor = type === 'note' ? note :
    type === 'list' ? list : checklist;
  const { item: newItem } = constructor.createItem( type );

  newList.classList.add( `${type}` );
  newList.appendChild( newItem );
  formFields.appendChild( newList );

  // get data from list
  const inputData = data.getInput( currentList, type );

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
  // const newList = constructor.createNewList( type );
  // const { item: newItem } = constructor.createItem( type );
  // newList.appendChild( newItem );
});

