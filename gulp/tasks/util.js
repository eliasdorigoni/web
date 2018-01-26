var gulp         = require('gulp'),
    del          = require('del'),
    livereload   = require('gulp-livereload')
    CONFIG       = require('../config.js')

gulp.task('clean', function() {
    return del(['./static/'])
})

gulp.task('forzar-livereload', function() {
    return livereload.reload()
})
