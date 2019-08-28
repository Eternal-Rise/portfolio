import smartgrid from 'smart-grid';

const grid = (dest, config) =>
  new Promise((resolve) => {
    smartgrid(dest, config);
    resolve();
  });

export default grid;
