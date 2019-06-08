'use strict'

import gulp from 'gulp';
import gulpIf from 'gulp-if';
import pug from 'gulp-pug';
import replace from 'gulp-replace';

const markup = (src, dest, production) => {
  return new Promise((resolve, reject) => {
    gulp.src(src)
      .pipe(pug({pretty: true}))

      .pipe(gulpIf(production, replace('index.css', 'index.min.css')))
      .pipe(gulpIf(production, replace('index.js', 'index.min.js')))
      
      .pipe(gulp.dest(dest));

    resolve(console.log('Write HTML...'))
  });
}

export default markup;