'use strict';

import gulp from 'gulp';

const fonts = (src, dest) => {
  return new Promise((resolve, reject) => {
    gulp.src(src)
      .pipe(gulp.dest(dest));
    resolve(console.log('Move fonts...'));
  });
}

export default fonts;