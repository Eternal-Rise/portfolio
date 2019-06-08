'use strict';

import gulp from 'gulp';
import svg from 'gulp-svg-sprite';

const svgsprites = (src, dest) => {
  return gulp.src(src)
    .pipe(svg({
      shape: {
        dest: "intermediate-svg"
      },
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(gulp.dest(dest));
}

export default svgsprites;