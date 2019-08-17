const usage = require('gulp-help-doc');

function help() {
    return usage(require('gulp'));
}

exports.default = help;
exports.help = help;
exports.copyBuildToFunctions = require('./tasks/copy-build-to-functions').copyBuildToFunctions;
exports.release = require('./tasks/release-automation').release;
exports.clearReleases = require('./tasks/clear-releases').clearReleases;
