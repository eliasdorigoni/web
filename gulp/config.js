var argv = require('yargs').argv,
    path = require('path')

module.exports = {
    dir: {
        layouts: './layouts/',
        root: './static/',
        assets: './static/assets/',
        theme: path.resolve('./') + '\\',
    },
    esBuild: function(bool) {
        if (typeof bool === 'boolean') {
            // bool esta configurado
        } else if (typeof argv.build === 'boolean') {
            // Si --build esta definido, es boolean (true)
            bool = argv.build
        } else {
            bool = false
        }

        return bool
    },
    dependenciasJS: [],
}

module.exports.esBuild() // Corrige el directorio si existe la bandera --build
