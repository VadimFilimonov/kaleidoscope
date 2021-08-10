const gulp = require('gulp');
const connect = require('gulp-connect');
const nunjucksRender = require('gulp-nunjucks-render');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

function html() {
  return gulp
    .src('src/templates/pages/*.njk')
    .pipe(
      nunjucksRender({
        path: ['src/templates/'],
      })
    )
    .on('error', console.log)
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
}

function css() {
  return gulp
    .src('src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
}

function js() {
  return gulp
    .src('src/js/**/*')
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
}

function watch() {
  gulp.watch('src/templates/**/*.njk', html);
  gulp.watch('src/scss/**/*.scss', css);
  gulp.watch('src/js/**/*.js', js);
}

function server() {
  return connect.server({
    root: 'dist',
    livereload: true,
  });
}

exports.watch = watch;
exports.server = server;
exports.build = gulp.parallel(html, css, js);
exports.default = gulp.parallel(html, css, js, watch, server);
