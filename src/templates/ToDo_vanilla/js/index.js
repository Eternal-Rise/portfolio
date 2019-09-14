console.log( 'i\'m running' );

import '../blocks/form/form';
import '../blocks/info/info';
import './utils/swipeControl';
import { note } from '../blocks/+list/note';
import { list } from '../blocks/+list/list';
import { checklist } from '../blocks/+list/checklist';
import { initialOutput, setWindowResizeRender } from '../blocks/output/output';

const initList = ( type ) => {

  const constructor = type === 'note' ? note :
    type === 'list' ? list : checklist;

  const newList = constructor.createNewList( type );
  const { item: newItem, inputField } = type === 'note' ?
    constructor.createItem({ type }) :
    constructor.createItem( type, newList );

  if ( type === 'note' ) {
    inputField.addEventListener( 'keydown', constructor.createNewLine );
    inputField.addEventListener( 'keydown', e => console.log(e.keyCode) );
  }

  newList.appendChild( newItem );
};

initList( 'note' );
initList( 'list' );
initList( 'checklist' );
initialOutput();
setWindowResizeRender();
