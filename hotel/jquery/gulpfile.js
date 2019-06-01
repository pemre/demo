const { series, parallel } = require('gulp');
const gulp = require('gulp');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const sass = require('gulp-sass');

function connectServer () {
  return connect.server({
    root: 'dist',
    livereload: true
  })
}

function copyIndexToDist () {
  return gulp.src(['./index.html'])
    .pipe(gulp.dest('./dist'))
}

function copyAllToDist () {
  return gulp.src([
    './index.html',
    '*tpl/**/*',
    '*img/**/*',
    '*js/**/*'
  ])
    .pipe(gulp.dest('./dist'))
}

function compileSass () {
  return gulp.src(['../*.scss', './sass/*.scss'])
    .pipe(sass({ errLogToConsole: true, outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./dist/css'))
}

function livereload () {
  return gulp.src('./dist/**/*')
    .pipe(connect.reload())
}

function watch () {
  gulp.watch('./index.html', copyIndexToDist);
  gulp.watch(['../*.scss', './sass/**/*.scss'], compileSass);
  gulp.watch('./dist/**/*', livereload);
}

exports.default = parallel(copyAllToDist, connectServer, watch, compileSass);
