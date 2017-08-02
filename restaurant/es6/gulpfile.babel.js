/**
 * Gulp config file
 *
 * @author Emre Piskin <piskin.emre@gmail.com>
 */

import gulp from 'gulp'
import gulploadplugins from 'gulp-load-plugins'
import yargs from 'yargs'
import browserSync from 'browser-sync'
import browserify from 'browserify'
import handlebars from 'browserify-handlebars'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import mocha from 'gulp-mocha' // Testing

const $ = gulploadplugins({lazy: true})
const argv = yargs.argv

// Unit tests Gulp example, practically same as "npm run test"
gulp.task('test', function () {
  return gulp.src(['test/**/*.spec.js'])
    .pipe(mocha({
      compilers: 'js:babel-core/register',
      require: ['jsdom-global/register']
    }))
})

// TDD/BDD - Test/Behaviour Driven Development
gulp.task('tdd', function () {
  $.util.log('Watching changes', $.util.colors.green('OK'))
  return gulp.watch(['src/**/*.js', 'test/**/*.spec.js'], ['test'])
})

// Sass Styles
gulp.task('styles', () => {
  return gulp.src([
    'src/sass/styles.scss'
  ])
    .pipe($.changed('.tmp/styles', {extension: '.css'}))
    .pipe($.if(!argv.production, $.sourcemaps.init()))
    .pipe($.sass({precision: 10}).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 10 version']}))
    .pipe(gulp.dest('.tmp'))
    // Concatenate and minify styles if production mode (via gulp styles --production)
    .pipe($.if('*.css' && argv.production, $.minifyCss()))
    .pipe($.if(!argv.production, $.sourcemaps.write()))
    .pipe(gulp.dest('public/css'))
    .pipe($.if(!argv.production, browserSync.stream()))
    .pipe($.size({title: 'styles'}))
})

// Scripts - app.js is the main entry point, you have to import all required files and modules
gulp.task('scripts', () => {
  return browserify({
    entries: 'src/js/index.js',
    debug: true
  })
    .transform('babelify', {presets: ['es2015']})
    .transform(handlebars)
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe($.if(!argv.production, $.sourcemaps.init({loadMaps: true})))
    .pipe($.if(argv.production, $.uglify()))
    .on('error', $.util.log)
    .pipe($.if(!argv.production, $.sourcemaps.write()))
    .pipe(gulp.dest('./public/js'))
})

// Browser-Sync
gulp.task('serve', ['styles'], () => {
  browserSync({
    notify: false,
    logPrefix: 'RESTAURANT',
    server: ['.tmp', 'public']
  })

  gulp.watch(['public/**/*.html'], browserSync.reload)
  gulp.watch(['src/sass/**/*.{scss,css}'], ['styles'])
  gulp.watch(['src/js/**/*.{js,es6,handlebars}'], ['scripts', browserSync.reload])
})

// Default task
gulp.task('default', ['styles', 'scripts'])
