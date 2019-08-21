;'use strict';

console.log("i'm running");
import { createItem } from '../blocks/+list/list';
import '../blocks/form/form';
import { initialOutput, setWindowResizeRender } from './utils/output';
import './utils/slideControlType';

const initList = ( type ) => {
  const list = document.querySelector( `.${type}` );
  const item = createItem( type, list );

  list.appendChild( item );
}

initList( 'checklist' );
initList( 'list' );
initList( 'note' );

initialOutput();
setWindowResizeRender();