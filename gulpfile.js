var gulp         = require('gulp'),
    argv         = require('yargs').argv,
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    del          = require('del'),
    gulpIgnore   = require('gulp-ignore'),
    gulpif       = require('gulp-if'),
    gutil        = require('gulp-util'),
    imagemin     = require('gulp-imagemin'),
    livereload   = require('gulp-livereload'),
    favicons     = require('gulp-favicons'),
    newer        = require('gulp-newer'),
    path         = require('path'),
    rename       = require("gulp-rename"),
    requireDir   = require('require-dir'),
    runSequence  = require('run-sequence'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    uglify       = require('gulp-uglify'),
    wait         = require('gulp-wait'),

var CONFIG = {
    dir: {
        root: './static/',
        assets: './static/assets/',
    },
    esBuild: typeof argv.build === 'boolean',
    noEsBuild: typeof argv.build !== 'boolean',
}

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

gulp.task('comprimir-imagenes', function() {
    return gulp.src('./source/img/**/*')
        .pipe(newer(CONFIG.dir.assets + 'img/'))
        .pipe(imagemin())
        .pipe(gulp.dest(CONFIG.dir.assets + 'img/'))
        .pipe(gulpif(CONFIG.noEsBuild, livereload()))
})

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

gulp.task('svg', function() {
    return gulp.src('./source/svg/*.svg')
        .pipe(newer(CONFIG.dir.assets + 'svg'))
        .pipe(imagemin())
        .pipe(gulp.dest(CONFIG.dir.assets + 'svg/'))
        .pipe(gulpif(CONFIG.noEsBuild, livereload()))
})

gulp.task('clean', function() {
    return del(['./static/'])
})

gulp.task('forzar-livereload', function() {
    return livereload.reload()
})

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

gulp.task('default', ['js', 'sass', 'comprimir-imagenes', 'svg', 'favicon'], function() {
    if (argv.watch) {
        runSequence('watch')
    }
})
