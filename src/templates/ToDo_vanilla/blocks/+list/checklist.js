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

  getCheckbox( item ) {
    return item.querySelector( '.checklist__checkbox' );
  }

  toggleChecked( item, checkbox ) {
    const findLevel = ( item ) => +this.findLevel( item ).slice( -1 ); // '_level-x' => x
    const getCheckbox = ( item ) => this.getCheckbox( item );
    const targetLevel = findLevel( item );

    let next = item.nextElementSibling;
    let prev = item.previousElementSibling;
    let nextLevel;
    let previousLevel;

    // toggle all childs
    if ( next ) {
      nextLevel = findLevel( next );

      while ( next && nextLevel > targetLevel ) {
        getCheckbox( next ).checked = checkbox.checked;
        next = next.nextElementSibling;
        if ( next ) nextLevel = findLevel( next );
      }
    }

    if ( targetLevel !== 1 ) {
      let parentLevel = targetLevel;
      let isRootToggled = false;
      previousLevel = findLevel( prev );

      while ( !isRootToggled ) {
        const prevCheckbox = getCheckbox( prev );

        if ( previousLevel === 1 ) isRootToggled = true;
        if ( previousLevel >= parentLevel && !prevCheckbox.checked ) break;
        if ( previousLevel < parentLevel ) {

          // toggle grandparent
          getCheckbox( prev ).checked = checkbox.checked;
          parentLevel = previousLevel;

          // check for unchecked
          next = item.nextElementSibling;
          nextLevel = findLevel( next );

          while ( next && nextLevel > parentLevel ) {
            if ( !getCheckbox( next ).checked ) {
              getCheckbox( prev ).checked = false;
              break;
            }
            next = next.nextElementSibling;
            if ( next ) nextLevel = findLevel( next );
          }
        }
        prev = prev.previousElementSibling;
        if ( prev ) previousLevel = findLevel( prev );
      }
    }
  }
}

export const checklist = new Checklist();
