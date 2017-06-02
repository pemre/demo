var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

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
        '*img/**/*',
        '*js/**/*'
    ])
        .pipe(gulp.dest('./dist'))
});

// keeps gulp from crashing for scss errors
gulp.task('sass', function () {
  return gulp.src('../asset/sass/*.scss')
      .pipe(sass({ errLogToConsole: true }))
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
  gulp.watch('../asset/sass/**/*.scss', ['sass']);
  gulp.watch('./dist/**/*', ['livereload']);
});

// default run script
gulp.task('default', ['copy-all', 'connect', 'watch', 'sass']);
