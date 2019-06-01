// Include gulp
const gulp = require('gulp');

// Include Plugins
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const sass = require('gulp-sass');

// Include live-reload
const browserSync = require('browser-sync').create();

gulp.task('pug', () => {
  return gulp.src(['src/**/*.pug', '!src/**/blocks/**/*.pug'])
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('dist/'))
});

gulp.task('sass', () => {
  return gulp.src(['src/**/*.+(sass|scss)', '!src/**/blocks/**/*.+(sass|scss)'])
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
      browsers: ['last 15 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
})

gulp.task('concat', () => {
  return gulp.src('src/blocks/**/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('dist/js/'))

    && gulp.src('src/templates/html5up_forty/**/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('dist/templates/html5up_forty/js/'))

    && gulp.src('src/templates/html5up_multiverse/**/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('dist/templates/html5up_multiverse/js/'));
});

gulp.task('serve', () => {

  browserSync.init({
      server: "./dist",
      scrollRestoreTechnique: 'cookie'
  });

  gulp.watch([
    "dist/**/*.html",
    'dist/img/*.*',
    'dist/templates/**/img/*.*',
    'dist/js/*.js',
    'dist/templates/**/js/*.js'
  ])
  .on('change', browserSync.reload);
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.pug', gulp.series('pug'));
  gulp.watch('src/**/*.+(sass|scss)', gulp.series('sass'));
  gulp.watch('src/**/*.js', gulp.series('concat'));
});

gulp.task('default', gulp.parallel('serve', gulp.series('watch')));