import { series, parallel, watch, src, dest } from 'gulp'
import del from 'del'
import imagemin from 'gulp-imagemin'
import gulpif from 'gulp-if'
import autoprefixer from 'gulp-autoprefixer'
import gulpIgnore from 'gulp-ignore'
import gutil from 'gulp-util'
import favicons from 'gulp-favicons'
import newer from 'gulp-newer'
import rename from "gulp-rename"
import runSequence from 'run-sequence'
import sass from 'gulp-sass'
import sassLint from 'gulp-sass-lint'
import sourcemaps from 'gulp-sourcemaps'
import uglify from 'gulp-uglify'
import wait from 'gulp-wait'

const buildSourceMaps = (process.env.NODE_ENV !== 'production')

function favicon(cb) {
    return src('./source/favicon.png')
        .pipe(newer({dest: './static/', ext: '.ico'}))
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
        .pipe(dest('./static/'))
}

function copyVendorScripts(cb) {
    return src('./source/js/vendor/*')
        .pipe(dest('./static/assets/js/'))
}

function compressSvg(cb) {
    return src('./source/svg/**/*.svg')
        .pipe(newer('./static/assets/svg'))
        .pipe(imagemin())
        .pipe(dest('./static/assets/svg/'))
}

function copyRootFiles(cb) {
    return src([
            './source/.htaccess',
            './source/cv.pdf',
        ])
        .pipe(dest('./static/'))
}

function styleLint(cb) {
    return src('./source/sass/**/*.scss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
}

const parseSass = series(styleLint, function(cb) {
    return src('./source/sass/*.scss')
    .pipe(wait(150))
    .pipe(gulpif(buildSourceMaps, sourcemaps.init()))
    .pipe(sass({
        outputStyle: 'compressed'
    })
    // .on('error', sass.logError)
    )
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulpif(buildSourceMaps, sourcemaps.write()))
    .pipe(dest('./static/assets/css/'))
})

function parseArticlesScripts(cb) {
    return src('./source/js/posts/*.js')
        .pipe(gulpif(buildSourceMaps, sourcemaps.init()))
        .pipe(uglify())
        .on('error', function(err) {
            console.error(err.toString())
        })
        .pipe(rename({suffix: '.min'}))
        .pipe(gulpif(buildSourceMaps, sourcemaps.write()))
        .pipe(dest('./static/assets/js/posts/'))
}

function compressImages(cb) {
    return src('./source/img/**/*')
        .pipe(newer('./static/assets/img/'))
        .pipe(imagemin())
        .pipe(dest('./static/assets/img/'))
}

function deleteStatic(cb) {
    return del(['./static/'])
}

const commonTasks = series(
    parallel(
        parseArticlesScripts,
        copyVendorScripts,
        parseSass,
        compressImages,
        compressSvg,
        favicon
    ),
    copyRootFiles,
)

exports.build = series(
    deleteStatic,
    parallel(
        parseArticlesScripts,
        copyVendorScripts,
        compressImages,
        compressSvg,
        favicon,
        copyRootFiles,
        parseSass,
    )
)

exports.watch = series(commonTasks, function(cb) {
    watch('./source/img/**/*', compressImages)
    watch('./source/js/**/*', parseArticlesScripts)
    watch('./source/sass/**/*.scss', parseSass)
    watch('./source/svg/**/*.svg', compressSvg)
})

exports.default = series(commonTasks)

/*
if (process.env.NODE_ENV === 'production') {
    exports.build = series(transpile, minify);
} else {
    exports.build = series(transpile, livereload);
}
*/
