/**
 * Re-generates the CHANGELOG.md file
 *
 * @task {changelog}
 * @arg {overwrite} If set to true will re-generate the changelog file for
 *                  all previous releases, otherwise will add any missing
 *                  releases to the file
 * @arg {changelog} The changelog path, defaults to "CHANGELOG.md"
 */

const { src, dest } = require('gulp');
const conventionalChangelog = require('gulp-conventional-changelog');
const minimist = require('minimist');


const {
    overwrite,
    changelog
} = minimist(process.argv.slice(2), {
    boolean: ['overwrite'],
    string: ['changelog'],
    default: {
        overwrite: false,
        changelog: 'CHANGELOG.md'
    }
});

function changelog() {
    return src(changelog, {
        buffer: false
    })
        .pipe(conventionalChangelog({
            preset: 'angular', // Or to any other commit message convention you use.
            releaseCount: overwrite ? 0 : 1
        }))
        .pipe(dest('./'));
}

exports.changelog = changelog;
