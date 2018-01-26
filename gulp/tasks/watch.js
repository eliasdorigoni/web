var gulp         = require('gulp'),
    livereload   = require('gulp-livereload'),
    CONFIG       = require('../config.js')

gulp.task('watch', function() {
    livereload.listen()
    gulp.watch('./source/img/**/*', ['comprimir-imagenes'])
    gulp.watch('./source/js/*.js', ['js'])
    gulp.watch([
        './source/js/includes/**/*',
        './source/js/backend/**/*',
        './source/js/admin/**/*',
    ], ['includes-js'])
    gulp.watch('./source/sass/**/*.scss', ['sass'])
    gulp.watch('./source/svg/*.svg', ['svg'])
    gulp.watch('./source/svg/sprite/*.svg', ['svg-sprite'])
})

