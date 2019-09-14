export class Note {
  createItem( args ) {
    const inputField = document.createElement( 'span' );
    const item = document.createElement( 'li' );

    const { type } = args;
    const classList = args.classList ? args.classList :
      [ `${type}__item`, '_level-1' ];

    inputField.classList.add( 'inputField' );
    inputField.contentEditable = 'true';
    inputField.addEventListener( 'blur', this.inputBlur );
    inputField.addEventListener( 'focus', this.inputFocus );
    inputField.addEventListener( 'paste', this.pasteText );
    item.classList.add( ...classList  );
    item.appendChild( inputField );

    return { item, inputField };
  }

  createNewList( type ) {
    const formFileds = document.querySelector( '.form__fields' );
    const list = document.createElement( 'ul' );

    formFileds.appendChild( list );
    list.classList.add( type );

    return list;
  }

  inputBlur( e ) {
    e.target.parentNode.classList.remove( '_focused' );
  }

  inputFocus( e ) {
    e.target.parentNode.classList.add( '_focused' );
  }

  focus( input ) { input.focus(); }

  pasteText( e ) {
    const paste = ( e.clipboardData || window.clipboardData ).getData( 'text' );
    e.preventDefault();
    e.target.ownerDocument.execCommand( 'insertHTML', false, paste );
  }

  createNewLine( e ) {
    if (e.keyCode === 13) {
      e.preventDefault();
      // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
      document.execCommand('insertHTML', false, '<br><br>');
    }
  }
}

export const note = new Note();
