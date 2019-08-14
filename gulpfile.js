const { src, dest } = require('gulp');
const del = require('del')

function help() {
    console.log('Help Gulp');
}

/**
 * Copies the current build from `./dist` tot the `./functions/dist` folder
 * so it can be deployed to cloud functions
 *
 * @return {Promise}
 */
function copyBuildToFunctions() {
    del.sync('functions/dist/**', {force: true});

    return src('dist/**')
        .pipe(dest('functions/dist/'));
}

exports.default  = help;
exports.copyBuildToFunctions = copyBuildToFunctions;
