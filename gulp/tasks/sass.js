var gulp         = require('gulp'),
    gulpif       = require('gulp-if'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename       = require("gulp-rename"),
    livereload   = require('gulp-livereload'),
    sourcemaps   = require('gulp-sourcemaps'),
    wait         = require('gulp-wait'),
    CONFIG       = require('../config.js')

gulp.task('sass', function(cb) {
    return gulp.src('./source/sass/*.scss')
        .pipe(wait(150))
        .pipe(gulpif(CONFIG.noEsBuild, sourcemaps.init()))
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulpif(CONFIG.noEsBuild, sourcemaps.write()))
        .pipe(gulp.dest(CONFIG.dir.assets + 'css/'))
        .pipe(gulpif(CONFIG.noEsBuild, livereload()))
})
