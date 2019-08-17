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
const debug = require('debug');
debug.enable('conventional-github-releaser');

const defaults = {
    type: 'patch',
    manifest: './package.json',
    changelog: './CHANGELOG.md'
};
const {
    type,
    manifest,
    changelog,
    token
} = minimist(process.argv.slice(2), {
    string: ['type', 'manifest', 'changelog', 'token'],
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
    git.push('origin', 'master', done);
}

function addTag(done) {
    const version = getPackageJsonVersion();
    git.tag(version, 'Created Tag for version: ' + version, function (error) {
        if (error) {
            return done(error);
        }
        git.push('origin', 'master', {args: '--tags'}, done);
    });

    function getPackageJsonVersion () {
        // We parse the json file instead of using require because require caches
        // multiple calls so the version number won't be updated
        return JSON.parse(fs.readFileSync(manifest, 'utf8')).version;
    }
}

function release(done) {
    conventionalGithubReleaser({
        type: "oauth",
        token: token || GITHUB_TOKEN
    }, {
        preset: 'angular' // Or to any other commit message convention you use.
    }, done);
}

exports.release = series(
    checkContext,
    bumpVersion,
    // changeLog,
    commit,
    // push,
    addTag,
    release
);
