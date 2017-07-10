var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect');

// connect the server
gulp.task('connect', function(){
  connect.server({
    root: 'dist',
    livereload: true
  });
});

// copy only index file to dist folder
gulp.task('copy-index', function () {
    return gulp.src(['./index.html'])
        .pipe(gulp.dest('./dist'))
});

// copy all files to dist folder
gulp.task('copy-all', function () {
    return gulp.src([
        './index.html',
        '*tpl/**/*',
        '*img/**/*',
        '*js/**/*'
    ])
        .pipe(gulp.dest('./dist'))
});

// keeps gulp from crashing for scss errors
gulp.task('sass', function () {
  return gulp.src(['../*.scss','./sass/*.scss'])
      .pipe(sass({ errLogToConsole: true, outputStyle: 'compressed' }))
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest('./dist/css'));
});

// launch livereload
gulp.task('livereload', function (){
  gulp.src('./dist/**/*')
  .pipe(connect.reload());
});

// watch only given files
gulp.task('watch', function () {
  gulp.watch('./index.html', ['copy-index']);
  gulp.watch(['../*.scss','./sass/**/*.scss'], ['sass']);
  gulp.watch('./dist/**/*', ['livereload']);
});

// default run script
gulp.task('default', ['copy-all', 'connect', 'watch', 'sass']);
