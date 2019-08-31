/**
 * Release manager that will
 * - bump your version
 * - create a changelog
 * - create a new tag
 * - create a release on Github
 * - commit and push all changes
 *
 * @task {release}
 * @arg {token} A Github personal access token, can also be set as an environment variable named GITHUB_TOKEN
 * @arg {branch} (optional) The branch to push the changes to, defaults to 'master'.
 * @arg {type} (optional) The release type, one of prerelease, patch, minor, major. Defaults to 'patch'.
 * @arg {manifest} (optional) Path to the package.json file. Defaults to './package.json'
 * @arg {changelog} (optional) Path to the CHANGELOG.md file. Defaults to './CHANGELOG.md'
 * @arg {url} (optional) The fully qualified domain name for the GitHub instance. Defaults to 'https://api.github.com'
 */

const { src, dest, series } = require('gulp');
const conventionalChangelog = require('gulp-conventional-changelog');
const conventionalGithubReleaser = require('conventional-github-releaser');
const bump = require('gulp-bump');
const log = require('gulplog');
const git = require('gulp-git');
const fs = require('fs');
const PluginError = require('plugin-error');
const minimist = require('minimist');

// Default option values
const defaults = {
    type: 'patch',
    manifest: 'package.json',
    changelog: 'CHANGELOG.md',
    branch: 'master',
    url: 'https://api.github.com'
};
const {
    type,
    manifest,
    changelog,
    token,
    branch,
    url
} = minimist(process.argv.slice(2), {
    string: ['type', 'manifest', 'changelog', 'token', 'branch', 'url'],
    default: defaults
});
const {GITHUB_TOKEN} = process.env;


/**
 * Check if all necessary arguments are set
 * @param done
 */
function checkContext(done) {
    if (!(token || GITHUB_TOKEN) || !manifest || !changelog) {
        done(new PluginError(
            'release automation',
            'Missing parameters, make sure you provide all the require ' +
            'arguments when running the release automation task'
        ))
    }
    log.info('Arguments OK, proceeding...');
    done();
}

/**
 * Bumps the manifest version based on release type
 * @return {*}
 */
function bumpVersion() {
    return src(manifest)
        .pipe(bump({type}))
        .on('error', function (err) {
            log.error(err);
            this.emit('end');
        })
        .pipe(dest('./'));
}

/**
 * Updates the changelog file with an auto generated entry.
 * @return {*}
 */
function changeLog() {
    return src(changelog)
        .pipe(conventionalChangelog({
            preset: 'angular' // Or to any other commit message convention you use.
        }))
        .pipe(dest('./'));
}

/**
 * Commit pending changes to the repository
 * @return {*}
 */
function commit() {
    return src('.')
        .pipe(git.add())
        .pipe(git.commit('[Prerelease] Bumped version number'));
}

/**
 * Adds a tag with the current manifest version
 * @param done
 */
function addTag(done) {
    // We parse the json file instead of using require because require caches
    // multiple calls so the version number won't be updated
    const version = JSON.parse(fs.readFileSync(manifest, 'utf8')).version;
    git.tag(version, 'Release Tag: ' + version, done);
}

/**
 * Pushes pending commits to the repository
 * @param done
 */
function push(done) {
    git.push('origin', branch, {args: '--tags'}, done);
}

/**
 * Creates a new Github release
 * @param done
 */
function release(done) {
    conventionalGithubReleaser({
        token: token || GITHUB_TOKEN,
        url: url
    }, {
        preset: 'angular' // Or to any other commit message convention you use.
    }, done);
}

exports.release = series(
    checkContext,
    bumpVersion,
    changeLog,
    commit,
    addTag,
    push,
    release
);
