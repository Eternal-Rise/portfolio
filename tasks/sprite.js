import gulp from 'gulp';
import svg from 'gulp-svg-sprite';

const svgsprites = (src, dest, config) =>
  gulp.src(src)
    .pipe(svg(config))
    .pipe(gulp.dest(dest));

export default svgsprites;
