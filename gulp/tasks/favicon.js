var gulp         = require('gulp'),
    favicons     = require('gulp-favicons'),
    gulpIgnore   = require('gulp-ignore'),
    gutil        = require('gulp-util'),
    newer        = require('gulp-newer'),
    CONFIG       = require('../config.js')

gulp.task('favicon', function() {
    return gulp.src('./source/favicon.png')
        .pipe(newer({dest: CONFIG.dir.root, ext: '.ico'}))
        .pipe(favicons({
            logging: false,
            online: false,
            html: false,
            replace: true,
            icons: {
                android: false,
                appleIcon: false,
                appleStartup: false,
                coast: false,
                favicons: true,
                firefox: false,
                windows: false,
                yandex: false
            },
        }))
        .on("error", gutil.log)
        .pipe(gulpIgnore.include('*.ico'))
        .pipe(gulp.dest(CONFIG.dir.root))
})
