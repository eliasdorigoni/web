var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    gulpif       = require('gulp-if'),
    livereload   = require('gulp-livereload'),
    sourcemaps   = require('gulp-sourcemaps'),
    uglify       = require('gulp-uglify'),
    CONFIG       = require('../config.js')

gulp.task('js', function() {
    var src = [
        './source/js/extend-app/*',
        './source/js/app.js',
    ]

    return gulp.src(src)
        .pipe(gulpif(CONFIG.noEsBuild, sourcemaps.init()))
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .on('error', function(err) {
            console.error(err.toString())
        })
        .pipe(gulpif(CONFIG.noEsBuild, sourcemaps.write()))
        .pipe(gulp.dest(CONFIG.dir.assets + 'js/'))
        .pipe(gulpif(CONFIG.noEsBuild, livereload()))
})
