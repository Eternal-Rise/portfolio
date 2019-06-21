'use strict';

import browserSync from 'browser-sync';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import groupmedia from 'gulp-group-css-media-queries';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

const styles = (src, dest, plugins, production) => {
  return gulp.src(src)
    .pipe(gulpIf(!production, sourcemaps.init()))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(groupmedia())
    .pipe(postcss(plugins))

    .pipe(gulpIf(production, rename({suffix: '.min'})))
    .pipe(gulpIf(!production, sourcemaps.write()))

    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
}

export default styles;