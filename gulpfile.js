// Include gulp
var gulp = require('gulp');

// Include Plugins
var autoprefixer = require('gulp-autoprefixer');
// var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
// var map = require('gulp-sourcemaps');
var pug = require('gulp-pug');
// var rename = require('gulp-rename');
var sass = require('gulp-sass');
// var uglify = require('gulp-uglify');

gulp.task('lint', function() {
  return gulp.src('dist/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
  return gulp.src('src/**/*.sass')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .on('error', function(err) {
      console.log(err);
      this.end()
    })
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
      grid: true
    }))
    .pipe(gulp.dest('dist/'))
});

gulp.task('pug', function() {
  return gulp.src('src/**/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .on('error', function(err) {
    console.log(err);
    this.end()
  })
  .pipe(gulp.dest('dist/'))
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.pug', gulp.series('pug'));
  gulp.watch('src/**/*.sass', gulp.series('sass'));
});

gulp.task('default', gulp.series('watch'));
