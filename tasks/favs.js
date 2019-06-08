'use strict';

import gulp from 'gulp';
import favicons from 'gulp-favicons';

const favs = (src, dest, templates, config) => {

  return new Promise((resolve, reject) => {
    gulp.src(src)
    .pipe(favicons(config))
    .pipe(gulp.dest(dest));
    
    // for (let template of templates) {
    //   gulp.src(template.favicon.src)
    //   .pipe(favicons(config))
    //   .pipe(gulp.dest(template.favicon.dest));
    // }

    resolve(console.log('Generation favicons...'));
  });
}

export default favs;