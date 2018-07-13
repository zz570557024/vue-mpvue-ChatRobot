const gulp = require('gulp');
const zip = require('gulp-zip');
const clean = require('gulp-clean');
const moment = require('dayjs');
const rename = require('gulp-rename');
const runSequence = require('run-sequence')
var argv = require('yargs').argv;
var env = argv.env || 'dev';

gulp.task('zip', () => {
  return gulp.src([
      './server/**/*', './package.json'
    ])
    .pipe(zip(moment().format("YYYY-MM-DD") + '-www.zip'))
    .pipe(gulp.dest("dist"));
})

gulp.task('build:public', () => {
  return gulp.src(['./dist/**'])
    .pipe(gulp.dest('./server/public'));
});

gulp.task('build:cleanMap', () => {
  gulp.src(['./dist/**'])
    .pipe(clean({
      force: true
    }))
})

gulp.task('build:clean', () => {
  gulp.src(
      [
        './.env', './server/public/**'
      ], {
        read: false
      })
    .pipe(clean({
      force: true
    }));
});

gulp.task('build', function () {
  runSequence(
    'zip'
  )
});
