// Include gulp
var gulp = require('gulp');

// Include Plugins
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
// var map = require('gulp-sourcemaps');
var pug = require('gulp-pug');
// var rename = require('gulp-rename');
var sass = require('gulp-sass');
// var uglify = require('gulp-uglify');

gulp.task('lint', function() {
  return gulp.src(['dist/js/*.js', 'src/components/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('concat', function() {
  return gulp.src('src/components/**/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('sass', function() {
  return gulp.src(['src/**/*.+(sass|scss)', '!src/components'])
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
  return gulp.src(['src/**/*.pug', '!src/components'])
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
  gulp.watch('src/**/*.+(sass|scss)', gulp.series('sass'));
  gulp.watch('src/components/**/*.js', gulp.series('concat'));
});

gulp.task('default', gulp.series('watch'));
