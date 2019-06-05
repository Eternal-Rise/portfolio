'use strict';

import del from 'del';

const cleaner = dest => {
  return del(dest);
}

export default cleaner;