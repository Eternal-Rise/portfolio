;'use strict';

console.log( 'i\'m running' );

import '../blocks/form/form';
import '../blocks/info/info';
import './utils/swipeControl';
import { createItem } from '../blocks/+list/list';
import { initialOutput, setWindowResizeRender } from '../blocks/output/output';

const initList = ( type ) => {
  const list = document.querySelector( `.${ type }` );
  const item = createItem( type, list );

  list.appendChild( item );
}

initList( 'checklist' );
initList( 'list' );
initList( 'note' );

initialOutput();
setWindowResizeRender();