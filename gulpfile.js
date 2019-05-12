// Include gulp
const gulp = require('gulp');

// Include Plugins
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const sass = require('gulp-sass');

// Include live-reload
const browserSync = require('browser-sync').create();

gulp.task('clean', () => {
  return gulp.src(
    ['dist/*.html', 'dist/css', 'dist/js'],
    {read: false})
      .pipe(clean());
});

gulp.task('pug', () => {
  return gulp.src('src/pages/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('sass', () => {
  return gulp.src('src/styles/**/*.+(sass|scss)')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
      browsers: ['last 15 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
})

gulp.task('concat', () => {
  return gulp.src('src/**/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('serve', () => {

  browserSync.init({
      server: "./dist"
  });

  gulp.watch(["dist/*.html", 'dist/img/*.*']).on('change', browserSync.reload);
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.pug', gulp.series('pug'));
  gulp.watch('src/**/*.+(sass|scss)', gulp.series('sass'));
  gulp.watch('src/**/*.js', gulp.series('concat'));
});

gulp.task('default', gulp.parallel('serve', gulp.series('watch')));