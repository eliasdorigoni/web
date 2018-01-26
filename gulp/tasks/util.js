var gulp         = require('gulp'),
    del          = require('del'),
    livereload   = require('gulp-livereload')
    CONFIG       = require('../config.js')

gulp.task('clean', ['clean-assets', 'clean-build'])

gulp.task('clean-assets', function() {
    return del(['./assets/'])
})

gulp.task('clean-build', function() {
    return del(['./build/'])
})

gulp.task('clean-static', function() {
    console.log(CONFIG.esBuild())
    console.log(CONFIG.dir.assets)
    return del(['./static/'])
})

gulp.task('forzar-livereload', function() {
    return livereload.reload()
})
