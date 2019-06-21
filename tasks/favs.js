'use strict';

import gulp from 'gulp';
import favicons from 'gulp-favicons';

const favs = (src, dest, config) => {
  return gulp.src(src)
    .pipe(favicons(config))
    .pipe(gulp.dest(dest));
}

export default favs;