'use strict';

import smartgrid from 'smart-grid';

const grid = (dest, config) => {
  return new Promise((resolve, reject) => {
    smartgrid(dest, config);
    resolve();
  });
}

export default grid;