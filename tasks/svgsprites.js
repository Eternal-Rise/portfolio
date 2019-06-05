import gulp from 'gulp';
import svg from 'gulp-svg-sprite';

const svgsprites = (src, dest, templates) => {
  gulp.src(src)
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
    .pipe(gulp.dest(dest))

  for (let template of templates) {
    gulp.src(template.svg.src)
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
    .pipe(gulp.dest(template.svg.dest))
  }
}

export default svgsprites;