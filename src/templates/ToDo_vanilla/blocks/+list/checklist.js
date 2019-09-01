import { List } from './list';

export class Checklist extends List {
  createItem( type, list, classList ) {
    const { item } = super.createItem( type, list, classList );

    const id = `c-${Math.random().toString( 36 ).substr( 2, 9 )}`;
    const checkbox = document.createElement( 'input' );
    const label = document.createElement( 'label' );

    checkbox.classList.add( 'checklist__checkbox', 'hidden' );
    checkbox.id = id;
    checkbox.type = 'checkbox';
    checkbox.addEventListener( 'change',
      this.toggleChecked.bind( this, item, checkbox ));

    label.classList.add( 'checklist__label' );
    label.htmlFor = id;

    item.insertBefore( label, item.firstElementChild );
    item.insertBefore( checkbox, item.firstElementChild );

    return { item };
  }

  toggleChecked( item, checkbox ) {
    const targetLevel = +findLevel( item ).slice( -1 ); // '_level-x' => x
    const isNotChecked = new Set();

    let current = item;
    let next = item.nextElementSibling;
    let prev = item.previousElementSibling;

    if ( next ) {
      let child = true;
      let nextLevel = +findLevel( next ).slice( -1 ); // '_level-x' => x

      while ( next && nextLevel !== 1 ) {
        const nextCheckbox = next.querySelector( '.checklist__checkbox' );

        if ( nextLevel === targetLevel ) child = false;
        if ( child && nextLevel > targetLevel ) {
          nextCheckbox.checked = checkbox.checked;
        } else if ( !nextCheckbox.checked ) isNotChecked.add( nextLevel );

        current = next;
        next = current.nextElementSibling;
        if ( next ) nextLevel = +findLevel( next ).slice( -1 ); // '_level-x' => x
      }
    }

    if ( prev ) {
      let count = 0;
      let currentLevel = +findLevel( item ).slice( -1 ); // '_level-x' => x
      let prevLevel = +findLevel( prev ).slice( -1 ); // '_level-x' => x

      while ( prev && count === 0 ) {
        const prevCheckbox = prev.querySelector( '.checklist__checkbox' );
        if ( prevLevel === 1 ) count++;
        if ( prevLevel < currentLevel ) {
          currentLevel = prevLevel;

          // + 1 cause we have childs set and toggle parents
          if ( isNotChecked.has( prevLevel + 1 )) {
            prevCheckbox.checked = false;
          } else prevCheckbox.checked = checkbox.checked;

        }
        if ( !prevCheckbox.checked ) isNotChecked.add( prevLevel );

        current = prev;
        prev = current.previousElementSibling;
        if ( prev ) prevLevel = +findLevel( prev ).slice( -1 ); // '_level-x' => x
      }
    }
  }
}

export const checklist = new Checklist();
