var argv = require('yargs').argv,
    path = require('path')

function esBuild() {
    return typeof argv.build === 'boolean'
}

module.exports = {
    dir: {
        root: './static/',
        assets: './static/assets/',
        theme: path.resolve('./') + '\\',
    },
    esBuild: esBuild(),
    noEsBuild: !esBuild(),
}
