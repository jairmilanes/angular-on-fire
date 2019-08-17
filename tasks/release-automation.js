/**
 * Release manager that will
 * - bump your version
 * - create a changelog
 * - create a new tag
 * - create a release on Github
 * - commit and push all changes
 *
 * @task {release}
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

const defaults = {
    type: 'patch',
    manifest: './package.json',
    changelog: './CHANGELOG.md',
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

function bumpVersion() {
    return src(manifest)
        .pipe(bump({type}))
        .on('error', function (err) {
            log.error(err);
            this.emit('end');
        })
        .pipe(dest('./'));
}

function changeLog() {
    return src(changelog, {
        buffer: false
    })
        .pipe(conventionalChangelog({
            preset: 'angular' // Or to any other commit message convention you use.
        }))
        .pipe(dest('./'));
}

function commit() {
    return src('.')
        .pipe(git.add())
        .pipe(git.commit('[Prerelease] Bumped version number'));
}

function push(done) {
    git.push('origin', branch, {args: '--tags'}, done);
}

function addTag(done) {
    // We parse the json file instead of using require because require caches
    // multiple calls so the version number won't be updated
    const version = JSON.parse(fs.readFileSync(manifest, 'utf8')).version;
    git.tag(version, 'Created Tag for version: ' + version, done);
}

function release(done) {
    conventionalGithubReleaser({
        token: token || GITHUB_TOKEN,
        url: branch
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
