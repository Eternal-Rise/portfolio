'use strict';

import gulp from 'gulp';

const fonts = (src, dest) => {
  return gulp.src(src)
    .pipe(gulp.dest(dest));
}

export default fonts;