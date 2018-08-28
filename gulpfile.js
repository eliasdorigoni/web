var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    del          = require('del'),
    gulpIgnore   = require('gulp-ignore'),
    gulpif       = require('gulp-if'),
    gutil        = require('gulp-util'),
    imagemin     = require('gulp-imagemin'),
    favicons     = require('gulp-favicons'),
    newer        = require('gulp-newer'),
    rename       = require("gulp-rename"),
    runSequence  = require('run-sequence'),
    sass         = require('gulp-sass'),
    sassLint     = require('gulp-sass-lint'),
    sourcemaps   = require('gulp-sourcemaps'),
    uglify       = require('gulp-uglify'),
    wait         = require('gulp-wait')

var CONFIG = {
    dir: {
        root: './static/',
        assets: './static/assets/',
    },
    esBuild: false,
    noEsBuild: true,
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
})

gulp.task('sasslint', function() {
    return gulp.src('./source/sass/**/*.scss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
})

gulp.task('sass', ['sasslint'], function(cb) {
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
})

gulp.task('comprimir-scripts', function() {
    return gulp.src('./source/js/*')
        .pipe(gulpif(CONFIG.noEsBuild, sourcemaps.init()))
        .pipe(uglify())
        .on('error', function(err) {
            console.error(err.toString())
        })
        .pipe(rename({suffix: '.min'}))
        .pipe(gulpif(CONFIG.noEsBuild, sourcemaps.write()))
        .pipe(gulp.dest(CONFIG.dir.assets + 'js/'))
})

gulp.task('mover-scripts-vendor', function() {
    return gulp.src('./source/js/vendor/*')
        .pipe(gulp.dest(CONFIG.dir.assets + 'js/'))
})

gulp.task('comprimir-svg', function() {
    return gulp.src('./source/svg/*.svg')
        .pipe(newer(CONFIG.dir.assets + 'svg'))
        .pipe(imagemin())
        .pipe(gulp.dest(CONFIG.dir.assets + 'svg/'))
})

gulp.task('eliminar-static', function() {
    return del(['./static/'])
})

gulp.task('mover-archivos-raiz', function() {
    return gulp.src([
            './source/.htaccess'
        ])
        .pipe(gulp.dest(CONFIG.dir.root))
})

var tareasComunes = [
    'comprimir-scripts',
    'mover-scripts-vendor',
    'sass',
    'comprimir-imagenes',
    'comprimir-svg',
    'favicon',
    'mover-archivos-raiz',
]

gulp.task('default', tareasComunes)

gulp.task('watch', tareasComunes, function() {
    gulp.watch('./source/img/**/*', ['comprimir-imagenes'])
    gulp.watch('./source/js/**/*', ['comprimir-scripts'])
    gulp.watch('./source/sass/**/*.scss', ['sass'])
    gulp.watch('./source/svg/*.svg', ['comprimir-svg'])
    gulp.watch('./source/svg/sprite/*.svg', ['svg-sprite'])
})

gulp.task('build', ['eliminar-static'], function() {
    CONFIG.esBuild = true
    CONFIG.noEsBuild = false
    runSequence(tareasComunes)
})
