var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    gulpif       = require('gulp-if'),
    livereload   = require('gulp-livereload'),
    sourcemaps   = require('gulp-sourcemaps'),
    uglify       = require('gulp-uglify'),
    CONFIG       = require('../config.js')

gulp.task('includes-js', function() {
    return gulp.src([
            './source/js/includes/**',
            './source/js/backend/**',
            './source/js/admin/**',
            ], {base: './source/js/'})
        .pipe(gulpif(!CONFIG.esBuild(), sourcemaps.init()))
        .pipe(uglify())
        .on('error', function(err) {
            console.error(err.toString())
        })
        .pipe(gulpif(!CONFIG.esBuild(), sourcemaps.write()))
        .pipe(gulp.dest(CONFIG.dir.assets + 'js/'))
        .pipe(gulpif(!CONFIG.esBuild(), livereload()))
})

gulp.task('js', function() {
    var src = [
        './source/js/extend-app/*',
        './source/js/app.js',
    ]

    // Modificar las dependencias en /gulp/config.js
    var deps = CONFIG.dependenciasJS
    if (deps.length > 0) {
        src = deps.concat(src)
    }

    return gulp.src(src)
        .pipe(gulpif(!CONFIG.esBuild(), sourcemaps.init()))
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .on('error', function(err) {
            console.error(err.toString())
        })
        .pipe(gulpif(!CONFIG.esBuild(), sourcemaps.write()))
        .pipe(gulp.dest(CONFIG.dir.assets + 'js/'))
        .pipe(gulpif(!CONFIG.esBuild(), livereload()))
})
