const { src, dest } = require('gulp');

function help() {
    console.log('Help Gulp');
}

function copyBuildToFunctions() {
    return src('dist/**').pipe(dest('functions/dist/'));
}

exports.default  = help;
exports.copyBuildToFunctions = copyBuildToFunctions;
