import { Note } from './note';
import { swipeConstructor } from '../../js/utils/swipeControl';

const KEY_CODE = {
  ENTER: 13,
  BACKSPACE: 8,
  DELETE: 46,
  NUM_DEL: 110,
  '[': 219,
  ']': 221,
};

export class List extends Note {
  createItem( type, list, classList ) {
    const { item, inputField } = super.createItem( type, classList );

    inputField.addEventListener( 'keydown',
      this.createNextItem.bind( this, type, list ));
    inputField.addEventListener( 'keydown', this.deleteItem.bind( this ));
    inputField.addEventListener( 'keydown',
      this.shiftItemByKeyboard.bind( this ));
    this.shiftItemByTouch( item );

    return { item, inputField };
  }

  createNextItem( type, list, e ) {
    if ( !e.shiftKey && e.keyCode === KEY_CODE.ENTER ) {
      e.preventDefault();

      const item = e.target.parentNode;
      const level = this.findLevel( item );
      const { item: newItem } = this.createItem(
        type, list, [ `${type}__item`, level ] );

      list.insertBefore( newItem, item.nextElementSibling );
      newItem.querySelector( '.inputField' ).focus();
    }
  }
  deleteItem( e ) {
    if (
      e.keyCode === KEY_CODE.BACKSPACE ||
      e.keyCode === KEY_CODE.DELETE ||
      ( e.shiftKey && e.keyCode === KEY_CODE.NUM_DEL )
    ) {
      const item = e.target.parentNode;
      const previous = item.previousElementSibling;

      if ( previous && e.target.textContent === '' ) {
        const input = previous.querySelector( '.inputField' );

        this.moveCaret( input );
        input.focus();
        item.remove();

      }
    }
  }

  findLevel( item ) { return item.classList.value.match(/_level-[1-9]/)[0]; }

  moveCaret( input ) {
    const range = document.createRange();
    const selection =  window.getSelection();

    // to prevent deleting last character. This is &nbsp;
    input.innerHTML += ' ';

    // move caret to last character
    range.setStart( input.lastChild, input.lastChild.length );
    range.collapse( true );
    selection.removeAllRanges();
    selection.addRange(range);
  }

  shiftItem( e, left, right, ctrlKey = true ) {
    const item = e.target.parentNode;
    const previous = item.previousElementSibling;
    const next = item.nextElementSibling;

    if ( !previous ) return;

    if ( ctrlKey && ( left || right ) ) {

      const level = this.findLevel( item );
      const levelPrev = this.findLevel( previous );

      let num = +level.slice( -1 );
      const numNext = next ? +this.findLevel( next ).slice( -1 ) : num;
      const numPrev = +levelPrev.slice( -1 );

      if ( left ) num = this.shiftItemLeft( num, numNext );
      else num = this.shiftItemRight( num, numPrev );

      item.classList.replace( level, `${level.slice( 0, -1 )}${num}` );

      num - numPrev > 0 ? item.classList.add( '_reset' ) :
        item.classList.remove( '_reset' );
    }
  }

  shiftItemLeft( num, numNext ) {
    return ( num > 1 && numNext - num < 1 ? --num : num );
  }

  shiftItemRight( num, numPrev ) {
    return ( num < 9 && num - numPrev <= 0 ? ++num : num );
  }

  shiftItemByKeyboard( e ) {
    const left = e.keyCode === KEY_CODE[ '[' ];
    const right = e.keyCode === KEY_CODE[ ']' ];
    this.shiftItem( e, left, right, e.ctrlKey );
  }

  shiftItemByTouch( target ) {
    return swipeConstructor( target, ( delta, SLIDE_RANGE, e ) => {
      const left = delta < -SLIDE_RANGE;
      const right = delta > SLIDE_RANGE;

      this.shiftItem( e, left, right );
    });
  }
}

export const list = new List();
