// Include gulp
const gulp = require('gulp');

// Include Plugins
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
// const map = require('gulp-sourcemaps');
const pug = require('gulp-pug');
// const rename = require('gulp-rename');
const sass = require('gulp-sass');
// const uglify = require('gulp-uglify');

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
  return gulp.src(['src/styles/**/*.+(sass|scss)'])
    .pipe(
      sass({
      outputStyle: 'expanded'
      })
      .on('error', function(error) {
        done(error)})
    )
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
      grid: true
    }))
    .pipe(gulp.dest('dist/css/'))
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
  gulp.watch('src/styles/**/*.+(sass|scss)', gulp.series('sass'));
  gulp.watch('src/components/**/*.js', gulp.series('concat'));
});

gulp.task('default', gulp.series('watch'));
