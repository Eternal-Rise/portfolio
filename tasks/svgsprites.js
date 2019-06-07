import gulp from 'gulp';
import svg from 'gulp-svg-sprite';
import { reject } from 'q';

const svgsprites = (src, dest, templates) => {
  return new Promise((resolve, reject) => {
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

    resolve(console.log('Building sprites...'));
  });  
}

export default svgsprites;