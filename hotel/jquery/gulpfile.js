const { parallel } = require('gulp');
const gulp = require('gulp');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const sass = require('gulp-sass');

const source = {
  all: [
    './index.html',
    '*tpl/**/*',
    '*img/**/*',
    '*js/**/*'
  ],
  sass: [
    '../*.scss',
    './sass/*.scss'
  ],
};

const dest = {
  all: './dist/**/*',
  css: './dist/css',
  root: './dist',
};

function connectServer () {
  return connect.server({
    root: dest.root,
    livereload: true
  });
}

function copyAllToDist () {
  return gulp.src(source.all)
    .pipe(gulp.dest(dest.root));
}

function compileSass () {
  return gulp.src(source.sass)
    .pipe(sass({ errLogToConsole: true, outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(dest.css));
}

function livereload () {
  return gulp.src(dest.all)
    .pipe(connect.reload());
}

function watch () {
  gulp.watch(source.all, copyAllToDist);
  gulp.watch(source.sass, compileSass);
  gulp.watch(dest.all, livereload);
}

exports.default = parallel(copyAllToDist, connectServer, watch, compileSass);
