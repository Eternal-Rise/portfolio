import gulp from 'gulp';

const fonts = (src, dest) =>
  gulp.src(src)
    .pipe(gulp.dest(dest));

export default fonts;
