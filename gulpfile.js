// @TODO: crear una tarea para eliminar carpetas de ../../plugins/ que coincidan con ./plugins/
// @TODO: permitir minificar SVGs de la raiz de source/svg/, y los que esten en carpetas convertirlos en sprites agrupados.

var gulp         = require('gulp'),
    argv         = require('yargs').argv,
    runSequence  = require('run-sequence'),
    requireDir   = require('require-dir'),
    CONFIG       = require('./gulp/config.js')

requireDir('./gulp/tasks');

gulp.task('default', ['js', 'sass', 'comprimir-imagenes', 'svg', 'favicon'], function() {
    if (argv.watch) {
        runSequence('watch')
    }
})
