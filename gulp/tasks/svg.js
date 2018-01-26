var gulp         = require('gulp'),
    gulpif       = require('gulp-if'),
    imagemin     = require('gulp-imagemin'),
    livereload   = require('gulp-livereload'),
    newer        = require('gulp-newer'),
    CONFIG       = require('../config.js')

gulp.task('svg', function() {
    return gulp.src('./source/svg/*.svg')
        .pipe(newer(CONFIG.dir.assets + 'svg'))
        .pipe(imagemin())
        .pipe(gulp.dest(CONFIG.dir.assets + 'svg/'))
        .pipe(gulpif(CONFIG.noEsBuild, livereload()))
})
