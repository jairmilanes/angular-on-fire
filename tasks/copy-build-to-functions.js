const { src, dest } = require('gulp');
const del = require('del');

/**
 * Copies the current build from `./dist` tot the `./functions/dist` folder
 * so it can be deployed to cloud functions
 *
 * @task {copyBuildToFunctions}
 */
exports.copyBuildToFunctions = function() {
    del.sync('functions/dist/**', {force: true});

    return src('dist/**')
        .pipe(dest('functions/dist/'));
};

