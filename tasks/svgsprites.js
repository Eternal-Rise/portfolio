import gulp from 'gulp';
import svg from 'gulp-svg-sprite';
import { reject } from 'q';

const svgsprites = (src, dest, templates) => {
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